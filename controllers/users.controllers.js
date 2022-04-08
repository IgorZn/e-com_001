const asyncHandler = require('../middleware/asyncErrHandler.middleware');

// Models
const Users = require('../models/user.mongo');
const mongooseErrHandler = require("../utils/errHandlersMongoose.utils");

const selectFields = 'name email phone country'

// @desc        Add user
// @route       POST /api/v1/users
// @access      Private
exports.addUser = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const result = await Users.findOne({ email: email })

    if (result) {
        return res.status(404).json({ success: false, data: "User with such email already registered" })
    }

    // Создать ключ passwordHash из password
    req.body.passwordHash = req.body.password

    const user = await Users.create(req.body);

    res.status(201).json({
        success: true,
        data: user
    });
});


// @desc        Get all user
// @route       GET /api/v1/user
// @access      Private
exports.getUsers = async (req, res, next) => {

    const user = await Users.find().select(selectFields);

    if(!user) {
        res.status(404).json({
            success: false
        })
    };

    res.status(201).json({
        success: true,
        count: user.length,
        data: user
    });
};


// @desc        Get single user
// @route       GET /api/v1/users/:id
// @access      Private
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await Users.findById(req.params.id)
                                        .select(selectFields)

    if (!user) return next(
        res.status(404).json({ success: false, data: null })
    )

    res.status(201).json({ success: true, data: user })
});
