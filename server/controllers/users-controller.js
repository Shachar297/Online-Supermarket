const express = require("express");
const usersLogic = require("../logic/users-logic");
const router = express.Router();
const userCache = require("./cache-controller");

router.post("/register", async (request, response, next) => {
    let user = request.body;
    console.log(user);

    try {
        let succesfullyRegisterResponse = await usersLogic.addUser(user);
        response.json(succesfullyRegisterResponse);
    } catch (e) {
        throw next(e);
    }
})

router.post("/login", async (request, response, next) => {
    let user = request.body;
    try {
        let succesfullyLoginResponse = await usersLogic.login(user);
        response.json(succesfullyLoginResponse);
    } catch (e) {
        return next(e);
    }
});

router.get("/cities", async (request, response, next) => {
    try {
        const cities = await usersLogic.getAllCities();
        response.json(cities);

    } catch (error) {
        return next(error);
    }
});

router.get("/streets/:cityName" , async (request , response , next) => {
    try {
        const cityName = request.params.cityName;
        const streets = await usersLogic.getAllStreetByCityName(cityName);
        response.json(streets);
    } catch (error) {
        return next(error);
    }
})

router.get("/count", async (request, response, next) => {
    try {
        const users = await usersLogic.countAllUsers();
        response.json(users);
    } catch (error) {
        return next(error);
    }
})

router.get("/details/", async (request, response, next) => {
    try {
        const details = await usersLogic.getDetailsFromUser(request);
        response.json(details);
    } catch (error) {
        return next(error)
    }
})

module.exports = router;