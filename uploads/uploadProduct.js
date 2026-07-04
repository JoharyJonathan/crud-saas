const multer = require('multer');
const path = require('path');

// Stockage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/products");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    
    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Unauthorized Type file"));
    }
};

// Multer initialisation
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 Mo
    },
    fileFilter
});

module.exports = upload;