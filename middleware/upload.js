
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create the uploads folder inside the backend project
const uploadPath = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + path.basename(file.originalname);

    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage
});

module.exports = upload;
