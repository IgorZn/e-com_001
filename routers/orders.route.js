const express = require('express');
const router = express.Router();

const {
    addOrder,
    getOrders
} = require("../controllers/orders.controllers");
const { authorize, protect} = require("../middleware/auth.middleware");

router.route('/')
    .post(protect, authorize('user', 'admin'), addOrder)
    .get(protect, authorize('admin'), getOrders)


module.exports = router;