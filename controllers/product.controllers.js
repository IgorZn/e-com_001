// Models
const Product = require('../models/product.mongo');


// @desc        Add product
// @route       POST /api/v1/products
// @access      Private
exports.addProduct = async (req, res, next) => {

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        data: product
    })
};


// @desc        Get all products
// @route       GET /api/v1/products
// @access      Private
exports.getProducts = async (req, res, next) => {

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
};
