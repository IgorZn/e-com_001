// Models
const Order = require('../models/order.mongo');
const OrderItem = require('../models/order-item.mongo');
const asyncHandler = require("../middleware/asyncErrHandler.middleware");


// @desc        Add order
// @route       POST /api/v1/orders
// @access      Private
exports.addOrder = async (req, res, next) => {
    /*
    *  Пройтись по всем элементам корзины, и на их основание
    *  создать объекты - OrderItem. Все объекты - Promise.
    *  Дождаться все Promise и отдать их.
    * */
    const orderItemsIDs = Promise.all(req.body.orderItems.map( async item => {

        let newOrderItem = new OrderItem({
            quantity: item.quantity,
            product: item.product
        });

        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
    })
    )

    // Assign orderItems to body
    req.body.orderItems = await orderItemsIDs;

    // Calculate total price
    const totalPrice = Promise.all(req.body.orderItems.map( async orderItemId => {
        /*
        *  Аналогично orderItemsIDs, но для цены. Берем orderItems,
        *  проходимся по всем элементам. Т.к. в orderItemId идет с ID
        *  то берем его и находим в БД, далее раскручиваем 'product'
        *  по и берем только цену
        *  отдать: цена * кол-во = итого
        * */
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
    }))

    // Assign total price
    req.body.totalPrice = (await totalPrice).reduce( (a, b) => a + b, 0 );

    // Assign current logged used ID
    req.body.user = req.user._id;

    // Create new Order
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


// @desc        Update order status
// @route       PUT /api/v1/orders/:id
// @access      Private
exports.updateOrder = asyncHandler(async (req, res, next) => {
    let order = await Order.findById(req.params.id)

    if (!order) return next(
        res.status(404).json({ success: false, data: null })
    )

    const { status } = req.body

    // order = Order.findOneAndUpdate(req.params.id, { status: req.body.status }, {
    //     new: true,
    //     runValidators: true
    // });

    await order.set({ status })
    await order.save()

    res.status(201).json({ success: true, data: order })
});


// @desc        Delete order
// @route       DELETE /api/v1/orders/:id
// @access      Private
exports.deleteOrder = asyncHandler(async (req, res, next) => {
    let order = await Order.findById(req.params.id)

    if (!order) return next(
        res.status(404).json({ success: false, data: null })
    )

    await order.remove().then( items => {
        // Cascade delete -OrderItem-
        items.orderItems.forEach( el => OrderItem.findById(el).remove().exec())
    }).catch(e => { res.status(400).json({ success: false, data: e }) });

    res.status(201).json({ success: true, data: null });
});