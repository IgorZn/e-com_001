const express = require('express');
const router = express.Router();

const {
    addOrder,
    getOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    getTotalSales, getUserOrders
} = require("../controllers/orders.controllers");

const { authorize, protect} = require("../middleware/auth.middleware");
const idChecker = require("../middleware/misc.middleware");

router.route('/')
    .post(protect, authorize('user', 'admin'), addOrder)
    .get(protect, authorize('admin'), getOrders)

router.route('/total')
    .get(protect, authorize('user', 'admin'), getTotalSales)

router.route('/user')
    .get(protect, authorize('user', 'admin'), getUserOrders)

router.route('/:id')
    .get(protect, idChecker, authorize('user', 'admin'), getSingleOrder)
    .put(protect, idChecker, authorize('user', 'admin'), updateOrder)
    .delete(protect, idChecker, authorize('user', 'admin'), deleteOrder)

module.exports = router;