const multer = require("multer");
const path = require("path");

const uploadPath = process.env.UPLOAD_PATH;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `.${uploadPath}`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split('.')[0]  + '_' + Date.now() + path.extname(file.originalname))
  }
});

const uploadOptions = multer({ storage: storage });

module.exports = uploadOptions;