const express = require("express");
const itemsLogic = require("../logic/cart-item-logic");
const router = express.Router();

router.post("/", async (request, response, next) => {
    const itemDetails = request.body;
    console.log(itemDetails)
    try {
        const details = await itemsLogic.addItemToCart(itemDetails, request);
        response.json(details);
    } catch (e) {
        return next(e);
    }
})

router.get("/", async (request, response, next) => {
    try {
        const item = await itemsLogic.getAllItemsByUserId(request);
        response.json(item);
    } catch (e) {
        return next(e);
    }
})

router.delete("/:id", async (request, response, next) => {
    const productId = request.params.id;
    try {
        const item = await itemsLogic.removeProductFromCartItem(productId, request);
        response.json(item);
    } catch (e) {
        return next(e);
    }
})

router.delete("/", async (request, response, next) => {
    try {
        await itemsLogic.removeAllProductsForCurrentUser(request);
        response.json();
    } catch (e) {
        return next(e);
    }
})

router.get("/:id", async (request, response, next) => {
    const productId = request.params.id;
    try {
        let item = await itemsLogic.getSingleProductByUserIdAndProductId(productId, request)
        response.json(item);
    } catch (e) {
        return next(e);
    }
})

module.exports = router;