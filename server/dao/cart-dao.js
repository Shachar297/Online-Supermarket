let connection = require("./connection-wrapper");
let errorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");


async function addToCart(userId) {
    let sql = `insert into cart (user_id , creation_date) values(?,?)`;
    let parameters = [userId, setTimeStamp()];
    try {
        await connection.executeWithParameters(sql, parameters)
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

async function isCartExistsForCurrentUser(userId) {
    let sql = `SELECT * from cart where user_id = ?`;
    let parameters = [userId];
    let details;
    try {
        details = await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        console.log(e, "exists");
        throw new Error(e);
    }
    if (details == null || details.length == 0) {

        return false;
    }
    return true;
}

async function getOpenedCartForCurrentUser(userId) {
    let sql = `SELECT id from cart where user_id = ?`;
    let parameters = [userId];
    try {
        cartId = await connection.executeWithParameters(sql, parameters);
        return cartId;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }

}

function setTimeStamp() {
    let currentTime = new Date();
    let dd = String(currentTime.getDate()).padStart(2, '0');
    let mm = String(currentTime.getMonth() + 1).padStart(2, '0');
    let yyyy = currentTime.getFullYear();

    currentTime = dd + '/' + mm + '/' + yyyy;
    return currentTime;
}

async function removeCartForCurrentUser(userId) {
    let sql = `delete from cart where user_id = ?`
    let parameters = [userId];
    try {
        await connection.executeWithParameters(sql, parameters)
    } catch (e) {

    }
}
module.exports = {
    addToCart,
    isCartExistsForCurrentUser,
    getOpenedCartForCurrentUser,
    setTimeStamp,
    removeCartForCurrentUser
}