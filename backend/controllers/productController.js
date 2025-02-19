const productService = require('../services/productService');


exports.getAllProducts = async (req, res) => {
    try {
        const baseURL = `${req.protocol}://${req.get("host")}/uploads/`;
        const products = await productService.getAllProducts(baseURL); 
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const baseURL = `${req.protocol}://${req.get("host")}/product-images/`;
        const product = await productService.getProductById(req.params.id, baseURL);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.createProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }

        const imagePath = req.file.filename;
        const productData = {
            Name: req.body.Name,
            Price: req.body.Price,
            Discount: req.body.Discount,
            image: imagePath,
        };

        const newProduct = await productService.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const currentProduct = await productService.getProductById(req.params.id);
        
        if (!currentProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        const { Name, Price, Discount } = req.body;
        const image = req.file ? req.file.filename : currentProduct.image; 

        const updatedProduct = await productService.updateProduct(req.params.id, { Name, image, Price, Discount });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const message = await productService.deleteProduct(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
