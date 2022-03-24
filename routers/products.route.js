const express = require('express');
const {
    getProducts,
    addProduct,
    getProduct
} = require("../controllers/product.controllers");

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(addProduct)

router.route('/:id')
    .get(getProduct)

module.exports = router;