
const userCache = new Map();

function get(key) {

    return userCache.get(key);
}

function put(key, value) {
    userCache.set(key, value);
}

function remove(key) {
    return userCache.remove(key);
}

function extractUserDataFromCache(request) {
    let authorizationString = request.headers["authorization"];
    let token = authorizationString.substring("bearer ".length);
    let userData = userCache.get(token);
    console.log(userData);
    return userData;
}

module.exports = {
    get,
    put,
    remove,
    extractUserDataFromCache
};