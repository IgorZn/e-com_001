// Models
const { Category } = require('../models/category.mongo');


// @desc        Add category
// @route       POST /api/v1/category
// @access      Private
exports.addCategory = async (req, res, next) => {

    const category = await Category.create(req.body);

    res.status(201).json({
        success: true,
        data: category
    });
};


// @desc        Get all categories
// @route       GET /api/v1/products
// @access      Private
exports.getCategories = async (req, res, next) => {

    const categories = await Category.find();

    if(!categories) {
        res.status(404).json({
            success: false
        })
    };

    res.status(201).json({
        success: true,
        data: categories
    });
};
