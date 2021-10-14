const usersDao = require("../dao/users-dao");

const validator = require("validator");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const errorType = require("../errors/error-type");
const userCache = require("../controllers/cache-controller");
var XLSX = require('xlsx');

const saltRight = "AGT553#gfhgdfhhdshfd!(9";
const saltLeft = "@@abc6sfdgfghjhfdasde788S";

async function addUser(user) {
    validateUserInputs(user);
    validateUserDetails(user);
    if (await usersDao.isUserExistByName(user.username)) {
        throw new ServerError(errorType.USER_NAME_ALREADY_EXIST);
    }
    user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");

    let userRegisterdata = await usersDao.addUser(user);
    const token = jwt.sign({ sub: saltLeft + user.username + saltRight }, config.secret);

    user.id = userRegisterdata.insertId;
    userCache.put(token, user);
    return { token: "Bearer " + token, userType: user.userType };
}

async function login(user) {
    validateUserInputs(user)
    user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
    let userLoginData = await usersDao.login(user);

    const token = jwt.sign({ sub: saltLeft + user.username + saltRight }, config.secret);
    userCache.put(token, userLoginData);

    return { token: "Bearer " + token, userType: userLoginData.user_type };
}

function validateUserInputs(user) {
    if (user.password.length == 0) throw new ServerError(ErrorType.USER_PASSWORD_CAN_NOT_BE_EMPTY);
    if (user.username.length == 0) throw new ServerError(ErrorType.USER_NAME_CAN_NOT_BE_EMPTY);
    if (!validator.isLength(user.password, { min: 4, max: 35 })) throw new ServerError(ErrorType.USER_BAD_PASSWORD);
    if (!validator.isLength(user.username, { min: 2, max: 20 })) throw new ServerError(ErrorType.USER_BAD_USERNAME);

}

function validateUserDetails(user) {
    console.log(user, "user")
    if (user.city.length == 0) throw new ServerError(errorType.CITY_CAN_NOT_BE_EMPTY);
    if (!validator.isLength(user.city, { min: 2, max: 15 })) throw new ServerError(errorType.CITY_BAD_LENGTH);
    if (user.street.length == 0) throw new ServerError(errorType.STREET_NAME_CAN_NOT_BE_EMPTY);
    if (!validator.isLength(user.street, { min: 2, max: 15 })) throw new ServerError(errorType.STREET_BAD_LENGTH);
    // if (user.identityNumber.length == 0) throw new ServerError(errorType.IDENTITY_NUMBER_CAN_NOT_REMAIN_EMPTY);
    if (user.identityNumber.length > 7 || user.identityNumber.length < 7) throw new ServerError(errorType.IDENTITY_NUMBER_BAD_LENGTH);
}

async function getAllCities() {
    let workbook = XLSX.readFile('tbl_citiesinisrael_heb.xlsx');
    let sheet_name_list = workbook.SheetNames;
    let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    return xlData
}

async function getAllStreetByCityName(cityName) {
    let workbook = XLSX.readFileSync('rechovot_20190401.csv', { encoding: "UTF-8" });

    let sheet_name_list = workbook.SheetNames;
    let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    let streets = generateStreets(cityName, xlData);
    console.log(streets)
    return xlData;
}

async function countAllUsers() {
    const users = usersDao.countAllUsers();
    return users;
}

async function getDetailsFromUser(request) {
    const userId = userCache.extractUserDataFromCache(request).id;
    const details = await usersDao.getDetailsFromUser(userId);
    return details;
}

function generateStreets(cityName, xlData) {
    let streets = [];
    for (let i = 0; i < xlData.length; i++) {
        if (xlData[i].city_name == cityName) {
            streets.push(xlData[i].streetName);
        }

    }

    return streets;
}

module.exports = {
    addUser,
    login,
    getAllCities,
    countAllUsers,
    getDetailsFromUser,
    getAllStreetByCityName
}