const asyncHandler = require('../middleware/asyncErrHandler.middleware');
const ErrorResponse = require('../utils/errResponse');
const jwt = require("jsonwebtoken");
const User = require('../models/user.mongo');


// Protect routes
exports.protect = asyncHandler( async (req, res, next) => {
    let token;
    let bearer = false;
    let authorization = 'authorization' in req.headers;
    if (authorization) {
        bearer = req.headers.authorization.split(' ');
    }

    if (authorization && bearer) {
        token = req.headers.authorization.split(' ')[1]; // get token -- [1]
    }
    else if (req.headers.cookie) {
        token = req.headers.cookie.split('token=')[1];
        // token = req.headers.cookie.token.split('=')[1];
    }

    // Make sure token exist
    if (!token) {
        return next( new ErrorResponse('Not authorized access', 401));
    }
    
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);

        next();
    } catch (e) {
        return next( new ErrorResponse('Not authorized access', 401));
    }
    
});

// Grant access to specific role
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user.isAdmin) {
            return next( new ErrorResponse(`User role ${req.user.role} is NOT unauthorized access to this route`, 403));
        };
        next();
    }
}