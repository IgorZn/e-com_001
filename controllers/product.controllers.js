const asyncHandler = require('../middleware/asyncErrHandler.middleware');

// Models
const Product = require('../models/product.mongo');
const Category = require("../models/category.mongo");


// @desc        Add product
// @route       POST /api/v1/products
// @access      Private
exports.addProduct = asyncHandler(async (req, res, next) => {
    if(!Object.keys(req.body).includes('category')) {
        return res.status(400).json({
            status: false,
            error: 'category is mandatory'
        })
    };

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

    const product = await Product.find();

    if(!product) {
        res.status(404).json({
            success: false
        })
    }

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
    // .populate() -- отобразит детали объекта, вместо одного ID
    // и включит его в ответе наравне с остальными полями модели
    const product = await Product.findById(req.params.id)
        .populate('category')
        .catch(e => {
        return res.status(404).json({ success: false, data: e.name })
    });

    res.status(201).json({ success: true, data: product });
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
