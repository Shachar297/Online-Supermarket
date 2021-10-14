const categoriesDao = require("../dao/categories-dao");

const validator = require("validator");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function getAllCategories(){
    const category = await categoriesDao.getAllCategories();
    return category;
}

async function getCategoriesByNameKeywords(Categorykeyword){
    let categories = await categoriesDao.getCategoriesByNameKeywords(Categorykeyword);
    return categories;
}

module.exports = {
    getAllCategories,
    getCategoriesByNameKeywords
}