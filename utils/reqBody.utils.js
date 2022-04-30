const fieldsChecker = (req, res, next, fields) => {
    console.log('fieldsChecker -->', req.body)
    for (const field of fields) {
        if(!Object.keys(req.body).includes(field)) {
            return res.status(400).json({
                status: false,
                error: `${field} is mandatory (can not be empty)`
            })
        };
    };

}

module.exports = { fieldsChecker };