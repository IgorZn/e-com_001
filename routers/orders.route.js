const express = require('express');
const router = express.Router();

const {
    addOrder,
    getOrders
} = require("../controllers/orders.controllers");

router.route('/')
    .post(addOrder)
    .get(getOrders)


module.exports = router;