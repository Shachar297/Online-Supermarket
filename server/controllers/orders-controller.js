const express = require("express");
const ordersLogic = require("../logic/orders-logic");
const router = express.Router();

router.post("/", async (request, response, next) => {
    let order = request.body;
    try {
        const details = await ordersLogic.order(order, request);
        response.json(details);
    } catch (e) {
        return next(e)
    }
})

router.get("/" , async ( request , response , next ) => {
    try {
        let orders = await ordersLogic.getAllOrders();
        response.json(orders);
    } catch (error) {
        return next(error)
    }
})

router.get("/byId/" , async ( request , response , next ) => {
    try {
        const orderState = await ordersLogic.isUserOrderedBefore(request);
        response.json(orderState);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;