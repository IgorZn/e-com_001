const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");

const {
    getCategories,
    addCategory,
    deleteCategory,
    getCategory,
    updateCategory
} = require("../controllers/categories.controllers");


router.route('/')
    .get(protect, getCategories)
    .post(addCategory)

router
    .route('/:id')
    .put(updateCategory)
    .get(getCategory)
    .delete(deleteCategory)

module.exports = router;