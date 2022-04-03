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
    .post(protect, addCategory)

router
    .route('/:id')
    .put(protect, updateCategory)
    .get(getCategory)
    .delete(protect, deleteCategory)

module.exports = router;