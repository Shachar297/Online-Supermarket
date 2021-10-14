let connection = require("./connection-wrapper");
const itemDao = require("./cart-item-dao");
const ServerError = require("../errors/server-error");
const errorType = require("../errors/error-type");

async function getAllProducts(userId) {
    try {
        let sql = `SELECT p.id , p.name ,
         p.category_id as categoryId , p.price,
         p.image_url as image ,
         c.name as categoryName from products p 
         join categories c on c.id = p.category_id order by p.id`;
        let parameters = [userId];
        let products = await connection.execute(sql);
        return products;
    } catch (e) {
        console.log(e);
        throw new ServerError(errorType.GENERAL_ERROR, e);
    }
}
async function removeProduct(productId) {
    await itemDao.removeItem(productId);
    let sql = `DELETE from products where id = ? `;
    let parameters = [productId];
    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        throw new ServerError(errorType.GENERAL_ERROR, sql, e);
    }
}

async function updateProduct(productId, productDetails) {
    let sql = `update products set name = ? , price = ? , image_url = ? where id = ?`;
    console.log(productId);
    let parameters = [productDetails.name, productDetails.price, productDetails.image, productId];
    console.log(productDetails)
    try {
        let newProductDetails = await connection.executeWithParameters(sql, parameters);
        return newProductDetails
    } catch (e) {
        throw new ServerError(errorType.GENERAL_ERROR, e);
    }
}

async function getProductById(productId) {
    let sql = `select * from products where id = ?`;
    let parameters = [productId];
    try {
        const product = await connection.executeWithParameters(sql, parameters);
        return product;
    } catch (e) {
        throw new ServerError(errorType.GENERAL_ERROR, e);
    }
}

async function getProductByName(productName) {
    let sql = `SELECT p.id , p.name ,
    p.category_id as categoryId , p.price,
    p.image_url as image from products p
    WHERE p.name like ? `;
    let parameters = ["%" + productName + "%"];

    try {
        let product = await connection.executeWithParameters(sql, parameters);
        return product;
    } catch (error) {
        throw new ServerError(errorType.GENERAL_ERROR, error);
    }
}

async function createProduct(product) {
    console.log(product);
    let sql = `INSERT INTO products (name , category_id , price , image_url) values(?,?,?,?)`;
    let parameters = [product.name, product.categoryId, product.price, product.image];

    try {
        const newProduct = await connection.executeWithParameters(sql, parameters);
        return newProduct;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}
module.exports = {
    getAllProducts,
    removeProduct,
    updateProduct,
    getProductById,
    getProductByName,
    createProduct
}