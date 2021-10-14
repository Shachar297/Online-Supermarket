const express = require("express");
const cors = require("cors");

const userController = require("./controllers/users-controller");
const productsController = require("./controllers/products-controller");
const ordersController = require("./controllers/orders-controller");
const categoriesControlloer = require("./controllers/categories-controller");
const cartController = require("./controllers/cart-controller");
const cartItemController = require("./controllers/cart-item-controller");


const loginFilter = require("./middleware/login-filter");
const server = express();

const port = process.env.PORT || 3010;
const errorHandler = require("./errors/error-hanlder");

server.use(cors({ origin: "http://localhost:4200" }));
server.use(express.json());
server.use(loginFilter());

server.use("/users", userController);
server.use("/products", productsController);
server.use("/orders", ordersController);
server.use("/categories", categoriesControlloer);
server.use("/cart", cartController);
server.use("/item", cartItemController);



server.use(errorHandler);
server.listen(port, () => console.log("Now Listening to port" + port));