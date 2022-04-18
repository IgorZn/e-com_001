const express = require('express');
const router = express.Router();

const {
    addOrder,
    getOrders, getSingleOrder, updateOrder, deleteOrder
} = require("../controllers/orders.controllers");

const { authorize, protect} = require("../middleware/auth.middleware");
const idChecker = require("../middleware/misc.middleware");

router.route('/')
    .post(protect, authorize('user', 'admin'), addOrder)
    .get(protect, authorize('admin'), getOrders)

router.route('/:id')
    .get(protect, idChecker, authorize('user', 'admin'), getSingleOrder)
    .put(protect, idChecker, authorize('user', 'admin'), updateOrder)
    .delete(protect, idChecker, authorize('user', 'admin'), deleteOrder)

module.exports = router;