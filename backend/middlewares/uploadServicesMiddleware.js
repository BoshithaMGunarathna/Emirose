const multer = require("multer");
const path = require("path");


const serviceStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "serviceImages/"); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});


const uploadServiceMiddleware = multer({ storage: serviceStorage });

module.exports = uploadServiceMiddleware;
