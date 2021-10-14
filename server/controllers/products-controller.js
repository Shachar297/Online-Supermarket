const express = require("express");
const productsLogic = require("../logic/products-logic");
const router = express.Router();

router.get("/", async (request, response, next) => {
    try {
        let products = await productsLogic.getAllProducts(request);
        response.json(products);
    } catch (e) {
        console.log(e);
        return next(e);
    }
})

router.delete("/:id", async (request, response, next) => {
    let productId = request.params.id;
    console.log(productId)
    try {
        let productToDelete = await productsLogic.removeProduct(productId, request)
        response.json(productToDelete);
    } catch {
        return next(e);
    }
})

router.put("/:id", async (request, response, next) => {
    let productId = request.params.id;
    let productDetails = request.body;
    try {
        let details = await productsLogic.updateProduct(productId, productDetails, request);
        response.json(details);
    } catch (e) {
        return next(e);
    }
});

router.get("/:id", async (request, response, next) => {
    const productId = request.params.id;
    try {
        let product = await productsLogic.getProductById(productId);
        response.json(product);
    } catch (e) {
        return next(e);
    }
});

router.get("/byName/:name", async (request, response, next) => {
    const productName = request.params.name;
    console.log(productName)
    try {
        let product = await productsLogic.getProductByName(productName);
        response.json(product);
    } catch (error) {
        return next(error);
    }
});

router.post("/", async (request, response, next) => {
    let product = request.body;
    try {
        let newProduct = await productsLogic.createProduct(product , request);
        response.json(newProduct);
    } catch (error) {
        return next(error);
    }

});
module.exports = router;