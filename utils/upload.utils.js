const multer = require("multer");
const path = require("path");

// Get .env
require('dotenv/config')

const uploadPath = '.' + process.env.UPLOAD_PATH;
console.log('UPLOAD_PATH -->>', path.resolve(uploadPath))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(uploadPath))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split('.')[0]  + '_' + Date.now() + path.extname(file.originalname))
  }
});

const uploadOptions = multer({ storage: storage });

module.exports = uploadOptions;