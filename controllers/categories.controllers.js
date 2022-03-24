const asyncHandler = require('../middleware/asyncErrHandler');

// Models
const { Category } = require('../models/category.mongo');


// @desc        Add category
// @route       POST /api/v1/category
// @access      Private
exports.addCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.create(req.body);

    if(!category) return next(
            res.status(404).json({ success: false, data: null })
        )

    res.status(201).json({
        success: true,
        data: category
    });
});


// @desc        Delete category
// @route       DELETE /api/v1/category/:id
// @access      Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id)

    if (!category) return next(
        res.status(404).json({ success: false, data: null })
    )

    res.status(201).json({ success: true, data: {} })
});


// @desc        Get single category
// @route       GET /api/v1/category/:id
// @access      Private
exports.getCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id)

    if (!category) return next(
        res.status(404).json({ success: false, data: null })
    )

    res.status(201).json({ success: true, data: category })
});


// @desc        Update single category
// @route       PUT /api/v1/category/:id
// @access      Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id)

    if (!category) return next(
        res.status(404).json({ success: false, data: null })
    )

    await category.set(req.body)
    await category.save()

    res.status(201).json({ success: true, data: category })
});


// @desc        Get all categories
// @route       GET /api/v1/products
// @access      Private
exports.getCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find();

    if(!categories) return next(
        res.status(404).json({ success: false })
    )

    res.status(201).json({
        success: true,
        count: categories.length,
        data: categories
    });
});
