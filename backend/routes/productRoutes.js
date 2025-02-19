const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const uploadProductMiddleware = require("../middlewares/uploadProductMiddleware");





router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post("/", uploadProductMiddleware.single("image"), productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
