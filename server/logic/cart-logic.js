const cartDao = require("../dao/cart-dao");
const userCache = require("../controllers/cache-controller");
const validator = require("validator");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function addToCart(userId){
    // 
    if(cartDao.isCartExistsForCurrentUser(userId)){
        return;
    }
    await cartDao.addToCart(userId);
}

async function isCartExistsForCurrentUser(request){
    const userId = userCache.extractUserDataFromCache(request).id
    const answer = cartDao.isCartExistsForCurrentUser(userId);
    return answer;
}


module.exports = {
    addToCart,
    isCartExistsForCurrentUser
}