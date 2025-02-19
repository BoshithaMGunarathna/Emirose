const db = require('../db/db');
const BASE_URL = process.env.BASE_URL;


exports.getAllProducts = async (baseURL) => {
    const [rows] = await db.query("SELECT * FROM products");

    return rows.map(product => {
        let images = [];
        
        if (product.image) {
            try {
                images = JSON.parse(product.image);
            } catch (error) {
                images = [product.image]; 
            }
        }
        return {
            ...product,
            images: images.map(img => `${baseURL}${img}`),
        };
    });
};




exports.getProductById = async (id, baseURL) => {
    const [rows] = await db.query("SELECT * FROM products WHERE idProduct = ?", [id]);
    if (rows.length === 0) return null; 

    const product = rows[0];
    let images = [];
    if (product.image) {
        try {
            images = JSON.parse(product.image);
        } catch (error) {
            images = [product.image]; 
        }
    }
    return {
        ...product,
        images: images.map(img => `${baseURL}${img}`),
    };
};


exports.createProduct = async (productData) => {
    const { Name, Price, Discount, image } = productData;
    const [result] = await db.query(
        "INSERT INTO products (Name, Price, Discount, Image) VALUES (?, ?, ?, ?)",
        [Name, Price, Discount, image]
    );

    return { id: result.insertId, ...productData };
};


exports.updateProduct = async (id, product) => {
    const { Name, image, Price, Discount } = product;
    await db.query("UPDATE products SET Name=?, image=?, Price=?, Discount=? WHERE idProduct=?", 
    [Name, image, Price, Discount, id]);
    return { id, ...product };
};

exports.deleteProduct = async (id) => {
    await db.query("DELETE FROM products WHERE idProduct=?", [id]);
    return { message: "Product deleted successfully" };
};
