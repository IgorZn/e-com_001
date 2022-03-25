const express = require('express');
const {
    getProducts,
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/product.controllers");

const idChecker = require("../middleware/misc.middleware");

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(addProduct)

router.route('/:id')
    .get(idChecker, getProduct)
    .put(idChecker, updateProduct)
    .delete(idChecker, deleteProduct)

module.exports = router;