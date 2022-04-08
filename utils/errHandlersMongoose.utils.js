
const mongooseErrHandler = (err, res, next) => {
  if (err) {
      res.status(500).json({ status: false });
  } else {
      next();
  }

}

module.exports = mongooseErrHandler