// Models
const Order = require('../models/order.mongo');
const OrderItem = require('../models/order-item.mongo');


// @desc        Add order
// @route       POST /api/v1/orders
// @access      Private
exports.addOrder = async (req, res, next) => {
    const orderItemsIDs = Promise.all(req.body.orderItems.map( async item => {
        let newOrderItem = new OrderItem({
            quantity: item.quantity,
            product: item.product
        });

        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
    })
    )

    req.body.orderItems = await orderItemsIDs;

    // Assign current logged used ID
    req.body.user = req.user._id;

    const order = await Order.create(req.body);

    res.status(201).json({
        success: true,
        data : order
    });
};


// @desc        Get all orders
// @route       GET /api/v1/orders
// @access      Private
exports.getOrders = async (req, res, next) => {

    const orders = await Order.find().populate({
        path: 'user',
        select: 'name'
    })
        .sort({ 'dateOrdered': -1 });

    if(!orders) {
        res.status(404).json({
            success: false
        })
    };

    res.status(201).json({
        success: true,
        count: orders.length,
        data: orders
    });
};


// @desc        Get single orders
// @route       GET /api/v1/orders/:id
// @access      Private
exports.getSingleOrder = async (req, res, next) => {

    const order = await Order.findById(req.params.id)
        .populate({
            path: 'user',
            select: 'name'
        })
        .populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                populate: 'category'
            }
        })

    if (!order) return next(
        res.status(404).json({ success: false, data: null })
    )

    res.status(201).json({
        success: true, data: order
    })
};
