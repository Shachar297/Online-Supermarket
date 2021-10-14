const express = require("express");
const cartLogic = require("../logic/cart-logic");
const router = express.Router();

router.post("/", async (request, response, next) => {
    // let cartDetails = request.body;
    try {
        let details = await cartLogic.addToCart(request);
        response.json(details);
    } catch (e) {
        return next(e);
    }
})

router.get("/" , async (request, response, next) => {
    try {
        const answer = await cartLogic.isCartExistsForCurrentUser(request);
        response.json(answer);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;