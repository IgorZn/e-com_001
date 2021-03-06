const asyncHandler = require('../middleware/asyncErrHandler.middleware');
const ErrorResponse = require('../utils/errResponse.utils');
const { fieldsChecker } = require("../utils/reqBody.utils");

// Models
const Product = require('../models/product.mongo');
const Category = require("../models/category.mongo");


// @desc        Add product
// @route       POST /api/v1/products
// @access      Private
exports.addProduct = asyncHandler(async (req, res, next) => {
    const FIELDS = ['category']
    fieldsChecker(req, res, next, FIELDS);

    // Make sure the image is a photo
    if(!req.file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    };

    // Image
    const fileName = req.file.filename
    const basePath = req.protocol + '://' + req.get('host') + process.env.UPLOAD_PATH
    const fullPath = basePath + fileName

    // Update image path value
    req.body.image = fullPath


    // Validate the category
    await Category.findById(req.body.category)
        .catch(err => { return res.status(404).json({ status: false, data: `Category error: ${err.name}` }) });

    const product = await Product.create(req.body);

    if (!product) {
        res.status(201).json({
            success: false,
            data: product
        })
    };

    res.status(201).json({
        success: true,
        data: product
    });
});


// @desc        Get all products
// @route       GET /api/v1/products
// @access      Private
exports.getProducts = asyncHandler(async (req, res, next) => {
    let filer = {};

    if (req.query.categories) {
        filer = { category: req.query.categories.split(',') }
    }

    const product = await Product.find(filer).populate({
        path: 'category',
        select: 'name icon'
    });

    if(!product) {
        res.status(404).json({
            success: false
        })
    };

    res.status(201).json({
        success: true,
        count: product.length,
        data: product
    })
});


// @desc        Get single product
// @route       GET /api/v1/products/:id
// @access      Private
exports.getProduct = asyncHandler(async (req, res, next) => {
    // .populate() -- ?????????????????? ???????????? ??????????????, ???????????? ???????????? ID
    // ?? ?????????????? ?????? ?? ???????????? ?????????????? ?? ???????????????????? ???????????? ????????????
    const product = await Product.findById(req.params.id)
        .populate('category')
        .catch(e => {
        return res.status(404).json({ success: false, data: e.name })
    });

    res.status(201).json({ success: true, data: product });
});


// @desc        Get all featured
// @route       GET /api/v1/products/get/featured
// @access      Private
exports.getFeatured = asyncHandler(async (req, res, next) => {
    // +count -- ?????????????????????? ?? ?????????? ???? ????????????
    const count = req.params.count ? req.params.count : 0

    // .populate() -- ?????????????????? ???????????? ??????????????, ???????????? ???????????? ID
    // ?? ?????????????? ?????? ?? ???????????? ?????????????? ?? ???????????????????? ???????????? ????????????
    const featured = await Product.find({ isFeatured: true })
        .populate('category')
        .limit(+count)
        .catch(e => {
            return res.status(404).json({ success: false, data: e.name })
    });

    res.status(201).json({ success: true, data: featured });
});


// @desc        Update single product
// @route       PUT /api/v1/products/:id
// @access      Private
exports.updateProduct = asyncHandler(async (req, res, next) => {

    // Validate the category
    await Category.findById(req.body.category)
        .catch(e => { return res.status(404).json({ status: false, data: `Category error: ${e.name}`}) });

    const product = await Product.findByIdAndUpdate(req.params.id, { new: true })
        .populate('category')
        .catch( e => res.status(404).json({ success: false, data: `Product error: ${e.name}` }))

    await product.set(req.body)
    await product.save()

    res.status(201).json({ success: true, data: product })
});


// @desc        Delete product
// @route       DELETE /api/v1/products/:id
// @access      Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {

    await Product.findByIdAndDelete(req.params.id)
        .catch( e => res.status(404).json({ success: false, data: `Product error: ${e.name}` }))

    res.status(201).json({ success: true, data: {} })
});
