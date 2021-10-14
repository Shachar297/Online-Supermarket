const ordersDao = require("../dao/orders-dao");

const validator = require("validator");
const ServerError = require("../errors/server-error");
const userCache = require("../controllers/cache-controller");
const cartDao = require("../dao/cart-dao");
const errorType = require("../errors/error-type");

async function order(order, request) {
    const user = userCache.extractUserDataFromCache(request);
    const userId = user.id;
    validateUserOrderDetails(order);
    if (!await cartDao.isCartExistsForCurrentUser(userId)) {

        await cartDao.addToCart(userId)
    }
    const details = await ordersDao.order(order, userId, user);

    return details;
}


async function getAllOrders(){
    let orders =await ordersDao.getAllOrders();
    return orders;
}

async function isUserOrderedBefore(request){
    const userId = userCache.extractUserDataFromCache(request).id;
    const orderState = await ordersDao.isUserOrderedBefore(userId);
    return orderState
}

function validateUserOrderDetails(order) {

    if (order.city.length == 0) throw new ServerError(errorType.CITY_CAN_NOT_BE_EMPTY);
    if (order.street.length == 0) throw new ServerError(errorType.STREET_NAME_CAN_NOT_BE_EMPTY);
    if (!validator.isLength(order.street, { min: 2, max: 15 })) throw new ServerError(errorType.STREET_BAD_LENGTH);
    // if (order.creditCard.length == 0) throw new ServerError(errorType.CREDIT_CARD_MISSING);
    console.log(order);
    if (order.creditCard.length < 4 || order.creditCard.length > 4) throw new ServerError(errorType.CREDIT_CARD_BAD_LENGTH);

}


module.exports = {
    order,
    getAllOrders,
    isUserOrderedBefore
}
