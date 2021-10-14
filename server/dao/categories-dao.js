const errorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let connection = require("./connection-wrapper");

async function getAllCategories() {
    let sql = `SELECT * FROM categories`;
    try {
        const category = await connection.execute(sql);
        return category;
    } catch (e) {
        throw new ServerError(errorType.GENERAL_ERROR, e);
    }
}

async function getCategoriesByNameKeywords(Categorykeyword) {
    let sql = `select p.id , p.name ,
    p.category_id as categoryId , p.price,
    p.image_url as image , c.name as categoryname from products p
    join categories c
    on p.category_id = c.id and c.name = ?`;
    let parameters = [Categorykeyword];

    try {
        let categories = await connection.executeWithParameters(sql, parameters);
        return categories;
    } catch (e) {
        console.log(e);
        throw new ServerError(errorType.GENERAL_ERROR, e);
    }
}
module.exports = {
    getAllCategories,
    getCategoriesByNameKeywords
}