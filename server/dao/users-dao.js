let connection = require("./connection-wrapper");
let errorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");


async function addUser(user) {
    console.log(user , "!!!!!!@#$%^&")

    let sql = "insert INTO users (username, password, user_type , identity_number , city , street) values (?,?,?,?,?,?)";
    let parameters = [user.username, user.password, user.userType, user.identityNumber, user.city, user.street];
    let registerResult;

    try {
        registerResult = await connection.executeWithParameters(sql, parameters);
        return registerResult;
    } catch (e) {
        console.error(e);
        throw new Error(e);
    }
}

async function login(user) {
    let sql = "select * from users where username=? and password=?";
    console.log(user, "loginnnnnn")
    let parameters = [user.username, user.password];
    
    let userLoginResult;

    try {

        userLoginResult = await connection.executeWithParameters(sql, parameters);
        console.log(parameters)
    } catch (e) {
        throw new ServerError(errorType.GENERAL_ERROR, JSON.stringify(user), e);
    }
    if (userLoginResult == null || userLoginResult.length == 0) {
        throw new ServerError(errorType.UNAUTHORIZED);
    }

    return userLoginResult[0];
}


async function isUserExistByName(username) {
    let sql = "select * from users where username =?";
    let parameters = [username];
    let registeryResponse;
    try {
        registeryResponse = await connection.executeWithParameters(sql, parameters);

    } catch (e) {

        throw new ServerError(errorType.GENERAL_ERROR, JSON.stringify(username), e);
    }

    if (registeryResponse == null || registeryResponse.length == 0) {
        return false;
    }
    return true;
}

async function countAllUsers(){
    let sql = `select count(id) as users from users`;

    try {
        const users = await connection.execute(sql);
        return users;
    } catch (error) {
        throw new ServerError(errorType.GENERAL_ERROR , error);
    }
}

async function getDetailsFromUser(userId){
let sql = `SELECT city , street FROM users where id = ?`;
let parameters = [userId];

try {
    const details = await connection.executeWithParameters(sql , parameters);
    return details;
} catch (error) {
    throw new ServerError(errorType.GENERAL_ERROR , error)
}

}
module.exports = {
    addUser,
    login,
    isUserExistByName,
    countAllUsers,
    getDetailsFromUser
}