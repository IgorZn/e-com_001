const asyncHandler = require('../middleware/asyncErrHandler');

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
    }

    await Category.findById(req.body.category)
        .catch(err => { return res.status(404).json({ status: false, data: err.name }) });

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
    const product = await Product.findById(req.params.id).catch(e => {
        return res.status(404).json({ success: false, data: e.name })
    });

    res.status(201).json({ success: true, data: product });
});