const asyncHandler = require('../middleware/asyncErrHandler.middleware');
const ErrorResponse = require('../utils/errResponse.utils');

const bcrypt = require('bcryptjs');
const Users = require('../models/user.mongo');
const { sendTokenResponse } = require("../utils/tokenHelpers.utils");


// @desc        Login user
// @route       POST /api/v1/auth/login
// @access      Private
exports.login = asyncHandler( async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return next( new ErrorResponse('Please provide an email and password', 400));
    };

    // Check for user
    const user = await Users.findOne({ email: email })
        .select('+passwordHash');

    if ( user.email.length === 0 ) {
        return next( new ErrorResponse('No such user...', 400) );
    };

    // Check if password
    // const isMatch = await user.matchPassword(password);
    const isMatch = await bcrypt.compare(password, user.passwordHash);


    if (!isMatch) {
        return next( new ErrorResponse('Invalid credentials', 400));
    };

    sendTokenResponse(user, 200, res);
    // res.status(200).json({ success: true, token: 'token()' });
});


