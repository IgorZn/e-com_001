const express = require('express');
const router = express.Router();

const {
    getCategories,
    addCategory,
    deleteCategory,
    getCategory,
    updateCategory
} = require("../controllers/categories.controllers");

router.route('/')
    .get(getCategories)
    .post(addCategory)

router
    .route('/:id')
    .put(updateCategory)
    .get(getCategory)
    .delete(deleteCategory)

module.exports = router;