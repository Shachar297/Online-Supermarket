const productsDao = require("../dao/products-dao");

const validator = require("validator");
const ServerError = require("../errors/server-error");
const userCache = require("../controllers/cache-controller");
const errorType = require("../errors/error-type");
const pushController = require("../controllers/PushController");

async function getAllProducts(request) {
    const userId = userCache.extractUserDataFromCache(request).id;
    let products = productsDao.getAllProducts(userId);
    return products;
}

async function removeProduct(productId) {
    // this function can only be called by an admin
    const userType = userCache.extractUserDataFromCache(request).user_type;
    validateUserActionByUserType(userType)
    let productToDelete = await productsDao.removeProduct(productId);
    return productToDelete;
}

async function updateProduct(productId, productDetails, request) {
    const userType = userCache.extractUserDataFromCache(request).user_type;
    validateUserActionByUserType(userType);
    validateAdminInputs(productDetails);
    let details = await productsDao.updateProduct(productId, productDetails);

    const event = { eventType: "EDIT_PRODUCT", parameters: productDetails };
    pushController.asyncBroadcast(event, userCache.extractUserDataFromCache(request).id);
    return details;
}

async function getProductById(productId) {
    const product = await productsDao.getProductById(productId);
    return product;

}

function validateAdminInputs(productDetails) {
    console.log(productDetails)
    if (productDetails.name.length == 0) throw new ServerError(errorType.PRODUCT_NAME_CAN_NOT_BE_EMPTY);
    if (!validator.isLength(productDetails.name, { min: 2, max: 20 })) throw new ServerError(errorType.PRODUCT_NAME_BAD_LENGTH);
    if (productDetails.price == 0) throw new ServerError(errorType.PRODUCT_PRICE_CAN_NOT_BE_ZERO);
    if (!validator.isLength(productDetails.image, { min: 10, max: 100 })) throw new ServerError(errorType.PRODUCT_IMAGE_MISSING);
    if (productDetails.categoryId == null || productDetails.categoryId == "" || productDetails.categoryId == undefined) {
        throw new ServerError(errorType.CATEGORY_MISSING);
    }
}

function validateUserActionByUserType(userType) {
    console.log(userType)
    if (userType !== "ADMIN") {
        throw new ServerError(errorType.UNAUTHORIZED_USER_TYPE);
    }
}

async function getProductByName(productName) {
    let product = await productsDao.getProductByName(productName);
    return product;
}

async function createProduct(product, request) {
    let userType = userCache.extractUserDataFromCache(request).user_type;
    validateUserActionByUserType(userType);
    validateAdminInputs(product);
    let newProduct = await productsDao.createProduct(product);
    return newProduct;
}

module.exports = {
    getAllProducts,
    removeProduct,
    validateUserActionByUserType,
    updateProduct,
    getProductById,
    getProductByName,
    createProduct
}