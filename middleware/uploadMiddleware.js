const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the temporary upload directory exists, create if it doesn't
const uploadDir = path.join(__dirname, '..', 'public', 'uploads', 'temp');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer to use disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save files to the temp directory
  },
  filename: function (req, file, cb) {
    // Create a unique filename to prevent overwriting files
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // Set a 10 MB file size limit
    },
    fileFilter: function (req, file, cb) {
        // Optional: Add a filter for allowed file types
        checkFileType(file, cb);
    }
}).fields([
    // These names must match the 'name' attribute in your HTML form's <input type="file">
    { name: 'marksheet10th', maxCount: 1 },
    { name: 'marksheet12th', maxCount: 1 },
    { name: 'marksheetJEE', maxCount: 1 },
    { name: 'passportPhoto', maxCount: 1 }
]);

// Helper function to check file types
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Only images (jpeg, jpg, png) and PDFs are allowed!');
    }
}

module.exports = upload;

