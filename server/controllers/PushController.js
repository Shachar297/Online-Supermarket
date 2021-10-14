const express = require("express");

const http = require("http"); // More basic server than express.
const socketIO = require("socket.io");
const expressServer = express();
const httpServer = http.createServer(expressServer); // Need express
const socketServer = socketIO(httpServer, {
    cors: {
        origin: "http://localhost:4200"
    }
});


const userCache = require("./cache-controller");

let userIdToSocketsMap = new Map();

socketServer.sockets.on("connection", socket => {
    console.log("Connection request");
    var handshakeData = socket.request;
    let token = handshakeData._query['token'].substring("bearer ".length);
    let userData = userCache.get(token);
    let userId = userData.id;

    console.log("User id: " + token);
    userIdToSocketsMap.set(userId, socket);

    console.log("One client has been connected... Total clients: " + userIdToSocketsMap.size);


    // 7. When user disconnects: 
    socket.on("disconnect", () => {
        var handshakeData = socket.request;
        let token = handshakeData._query['token'].substring("bearer ".length);
        console.log(token)
        let userData = userCache.get(token);
        let userId = userData.id;

        userIdToSocketsMap.delete(userId);
        console.log(userId + " client has been disconnected. Total clients: " +
            userIdToSocketsMap.size);
    });

});

httpServer.listen(3003, () => console.log("Listening..."));

// Note: When using React, change that port to 3001
async function asyncBroadcast(event, senderId) {
    for ([userId, socket] of userIdToSocketsMap) {
        if (senderId != userId) {
            socket.emit(event.eventType, event.parameters);
        }
    }
}

module.exports = {
    asyncBroadcast,
    httpServer
}
