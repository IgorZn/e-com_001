// Models
const { Users } = require('../models/user.mongo');


// @desc        Add user
// @route       POST /api/v1/user
// @access      Private
exports.addUser = async (req, res, next) => {

    const user = await Users.create(req.body);

    res.status(201).json({
        success: true,
        data: user
    });
};


// @desc        Get all user
// @route       GET /api/v1/user
// @access      Private
exports.getUsers = async (req, res, next) => {

    const user = await Users.find();

    if(!user) {
        res.status(404).json({
            success: false
        })
    };

    res.status(201).json({
        success: true,
        data: user
    });
};