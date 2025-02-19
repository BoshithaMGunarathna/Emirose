const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "productImages/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});


const uploadProductMiddleware = multer({ storage: storage });

module.exports = uploadProductMiddleware;
