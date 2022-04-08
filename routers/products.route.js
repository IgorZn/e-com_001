const express = require('express');
const {
    getProducts,
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getFeatured
} = require("../controllers/product.controllers");

const idChecker = require("../middleware/misc.middleware");
const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(protect, addProduct)

router.route('/get/featured/:count')
    .get(getFeatured)

router.route('/:id')
    .get(idChecker, getProduct)
    .put(protect, idChecker, authorize('admin'), updateProduct)
    .delete(protect, idChecker, authorize('admin'), deleteProduct)

module.exports = router;