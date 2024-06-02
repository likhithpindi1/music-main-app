const multer = require("multer");
const path = require("path");
// const upload = multer({ dest: "../utilities/upload" });
const uploadDirectory = path.resolve(__dirname, "../utilities/upload");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
