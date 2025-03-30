const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Define upload directory
const uploadDir = path.join(__dirname, "../uploads");

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Use the dynamically created upload folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Create Multer Middleware
const upload = multer({ storage });

module.exports = upload;
