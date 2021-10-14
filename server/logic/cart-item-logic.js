const itemDao = require("../dao/cart-item-dao");
const userCache = require("../controllers/cache-controller");
const validator = require("validator");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const cartDao = require("../dao/cart-dao");
const pushController = require("../controllers/PushController");

async function addItemToCart(itemDetails, request) {
    const userId = userCache.extractUserDataFromCache(request).id;
    if (!await cartDao.isCartExistsForCurrentUser(userId)) {
        await cartDao.addToCart(userId)
    }

    if (!await itemDao.isItemExistsForCurrentUser(itemDetails, userId)) {
        const details = await itemDao.addItemToCart(itemDetails, userId);
        const event = { eventType: "ADD_ITEM", parameters: itemDetails };
        pushController.asyncBroadcast(event, userId);

        return details;
    }

    else if (await itemDao.isItemExistsForCurrentUser(itemDetails, userId)) {
        console.log(await itemDao.isItemExistsForCurrentUser(itemDetails, userId), "isItemExists")
        let product = await itemDao.updateItemForCurrentUserIfAlreadyExists(itemDetails, userId)

        return product;
    }
}

async function getAllItemsByUserId(request) {
    const userId = userCache.extractUserDataFromCache(request).id;
    const item = await itemDao.getAllItemsByUserId(userId);
    return item;
}

async function removeProductFromCartItem(productId, request) {
    const userId = userCache.extractUserDataFromCache(request).id;
    const item = await itemDao.removeProductFromCartItem(productId, userId);
    return item;

}

async function removeAllProductsForCurrentUser(request) {
    const userId = userCache.extractUserDataFromCache(request).id;
    await itemDao.removeAllProductsForCurrentUser(userId);
}
async function getSingleProductByUserIdAndProductId(productId, request) {
    const userId = userCache.extractUserDataFromCache(request).id;
    let item = await itemDao.getSingleProductByUserIdAndProductId(productId, userId);
    return item;
}
module.exports = {
    addItemToCart,
    getAllItemsByUserId,
    removeProductFromCartItem,
    removeAllProductsForCurrentUser,
    getSingleProductByUserIdAndProductId
}