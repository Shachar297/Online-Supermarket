const errorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let connection = require("./connection-wrapper");


async function order(order, userId, user) {
    console.log(user)
    let sql = `
insert into orders 
(user_id , cart_id , final_price , city, street , shipping_date , date_ordered , four_digits_credit_card) 
values(? , 
(select DISTINCT ci.cart_id  from cart_item ci join cart c on ci.cart_id = c.id and c.user_id= ${userId}) ,
(select SUM(ci.price) from cart_item ci join cart c ON ci.cart_id = c.id AND c.user_id = ${userId}) ,
? , ? , ? ,
(SELECT DISTINCT c.creation_date from cart c join cart_item ci ON c.user_id = ${userId} and ci.cart_id = c.id) , ? );`;
    let parameters = [userId, order.city, order.street, order.date, order.creditCard];
    console.log(parameters)
    try {
        const details = connection.executeWithParameters(sql, parameters);

        return generateFile(user, order);
    } catch (e) {
        console.log(e)
        throw new ServerError(errorType.GENERAL_ERROR, e);
    }
}

function generateFile(user, order) {
    const recipe = {
        userDetails: {
            userDetails: user.username

        },
        orderDetails: {
            date: setTimeStampOnOrder(),
            total: order.total,
            city: order.city,
            street: order.street
        }
    }
    return recipe;
}

async function getAllOrders() {
    let sql = `select count(id) as numOfOrders , 
    id , user_id as userId , 
    cart_id as cartiD , 
    final_price as finalPrice , city , street,
    shipping_date as shiipingDate , date_ordered as dateOrdered from orders`;

    try {
        const orders = await connection.execute(sql);
        console.log(orders);
        return orders;
    } catch (error) {
        throw new ServerError(errorType.GENERAL_ERROR, error)
    }

}

async function isUserOrderedBefore(userId) {
    let sql = `SELECT * from orders where user_id = ?`;
    let parameters = [userId];
    let answer;
    try {
        answer = await connection.executeWithParameters(sql, parameters);

        if (answer == null || answer == undefined) {

            return false;
        }

        return true;

    } catch (error) {
        throw new ServerError(error.GENERAL_ERROR, error)
    }
}

function setTimeStampOnOrder() {
    let currentTime = new Date();
    let dd = String(currentTime.getDate()).padStart(2, '0');
    let mm = String(currentTime.getMonth() + 2).padStart(2, '0');
    let yyyy = currentTime.getFullYear();

    if (mm == '13') {
        mm = '1'
    }
    currentTime = dd + '/' + mm + '/' + yyyy;

    return currentTime;
}

module.exports = {
    order,
    getAllOrders,
    isUserOrderedBefore
}
