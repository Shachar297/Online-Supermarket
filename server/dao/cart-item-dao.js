let connection = require("./connection-wrapper");
let errorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

const cartDao = require("./cart-dao");

async function addItemToCart(itemDetails, userId) {
    console.log(itemDetails)
    // isItemExistsForCurrentUser(itemDetails , userId);
    let sql = `INSERT INTO cart_item 
    (product_id , quantity , price , cart_id)
    VALUES (? , ? , ? , 
        (SELECT id FROM cart WHERE user_id = ${userId}))`;
    // (select id from products where name = ?)
    const price = itemDetails.price * itemDetails.quantity;
    let parameters = [itemDetails.id, itemDetails.quantity, itemDetails.price * itemDetails.quantity];
    console.log(parameters)
    try {
        const item = await connection.executeWithParameters(sql, parameters);
        console.log("item", item)
        return item;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

async function getSingleProductByUserIdAndProductId(productId, userId) {
    let sql = `
    select ci.id , ci.product_id as productId , 
    ci.quantity, ci.price , 
    ci.cart_id as cartId ,
    p.name as productName , p.price as productPrice,
    p.image_url as image
    from cart_item ci
    join cart c
    on c.user_id = ? and ci.product_id = ? and ci.cart_id = c.id
    join products p
    on  p.id = ci.product_id
 `;
    let parameters = [userId, productId];
    console.log(productId)
    try {
        const item = await connection.executeWithParameters(sql, parameters);
        return item;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

async function getAllItemsByUserId(userId) {
    let sql = `
    select ci.id , ci.product_id as productId , 
    ci.quantity, ci.price , 
    ci.cart_id as cartId ,
    p.name as productName , p.price as productPrice,
    p.image_url as image
    from cart_item ci
    join cart c
    on c.user_id = ? and ci.cart_id = c.id
    join products p
    on  p.id = ci.product_id
 `;
    let parameters = [userId];
    try {
        const item = await connection.executeWithParameters(sql, parameters);
        return item;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

async function removeProductFromCartItem(productId, userId) {
    let sql = `
    DELETE ci from cart_item ci
    join cart c
    on ci.product_id = ? and ci.cart_id = c.id and c.user_id = ? `;

    //extra -validating removing the currect value in DB .
    let parameters = [productId, userId];
    console.log(parameters)
    try {
        const item = await connection.executeWithParameters(sql, parameters);
        console.log(item)
        return item;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

async function removeAllProductsForCurrentUser(userId) {
    let sql = `DELETE ci from cart_item ci
    join cart c
    on ci.cart_id = c.id and c.user_id = ?`;
    let parameters = [userId];
    try {
        await connection.executeWithParameters(sql, parameters);
        await cartDao.removeCartForCurrentUser(userId);
    } catch (e) {
        throw new Error(e);
    }
}

async function removeItem(productId) {
    // this function is being called only from productsDao - Foreigned Key.
    let sql = `DELETE from cart_item where product_id = ?`;
    let parameters = [productId];
    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (e) {
        throw new Error(e);
    }
}

async function isItemExistsForCurrentUser(itemDetails, userId) {

    let sql = `select * from cart_item ci 
    join cart c on ci.cart_id = c.id 
    and ci.product_id = ?
    and c.user_id = ?`;

    let parameters = [itemDetails.productId, userId];
    let details;
    try {
        details = await connection.executeWithParameters(sql, parameters);

    } catch (e) {
        throw new ServerError(errorType.GENERAL_ERROR, e);
    }
    if (details == null || details.length == 0) {
        // updateItemForCurrentUserIfAlreadyExists(itemDetails , userId);

        return false;
    }

    return true;
}

async function updateItemForCurrentUserIfAlreadyExists(itemDetails, userId) {

    let sql = `UPDATE cart_item ci 
    JOIN cart c
    on c.user_id = ?
    and c.id = ci.cart_id
    and ci.product_id = ?
    SET quantity = ? , price = ?`;

    let oldProductDetails = await getSingleProductByUserIdAndProductId(itemDetails.id, userId);;
    console.log(itemDetails.price * (itemDetails.quantity + oldProductDetails[0].quantity))
    let parameters = [userId, itemDetails.id, itemDetails.quantity + oldProductDetails[0].quantity, itemDetails.price * (itemDetails.quantity + oldProductDetails[0].quantity)];

    try {
        let product = await connection.executeWithParameters(sql, parameters);
        return product;
    } catch (e) {
        throw new ServerError(errorType.GENERAL_ERROR, e);
    }
}
module.exports = {
    addItemToCart,
    getAllItemsByUserId,
    removeProductFromCartItem,
    removeAllProductsForCurrentUser,
    getSingleProductByUserIdAndProductId,
    removeItem,
    isItemExistsForCurrentUser,
    updateItemForCurrentUserIfAlreadyExists
}