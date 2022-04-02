// Create token
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const getSignedJwtToken = function (user) {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
};

// Get token from the model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = getSignedJwtToken(user);

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    };

    res
        .status(statusCode)
        .cookie('token', token)
        .json({
            success: true,
            token
        })
};

// Generate and hash password
const getResetPasswordToken = function (userModel) {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    userModel.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set expire
    userModel.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;

};

module.exports = { getSignedJwtToken, sendTokenResponse, getResetPasswordToken};