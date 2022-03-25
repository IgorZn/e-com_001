const mongoose = require('mongoose');


const idChecker = async (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return next(
            res.status(404).json({ status: false, data: `Invalid ID`})
        );
    };
    next();
}

module.exports = idChecker;