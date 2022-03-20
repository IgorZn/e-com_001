// Models
const { Orders } = require('../models/order.mongo');


// @desc        Add order
// @route       POST /api/v1/orders
// @access      Private
exports.addOrder = async (req, res, next) => {

    const order = await Orders.create(req.body);

    res.status(201).json({
        success: true,
        data: order
    });
};


// @desc        Get all orders
// @route       GET /api/v1/orders
// @access      Private
exports.getOrders = async (req, res, next) => {

    const orders = await Orders.find();

    if(!orders) {
        res.status(404).json({
            success: false
        })
    };

    res.status(201).json({
        success: true,
        data: orders
    });
};
