const express = require("express");
const path = require("path");

const productsRouter = require("./routes/products");

const logger = require("./helpers/logger");
const authorize = require("./helpers/authorize");

const app = express();

app.use(express.json());

//Req ==> Middleware ==> Response

app.use(express.urlencoded({ extended: true }));

//Routing
app.get("/", logger, authorize, (req, res, next) => {
  res.send("Welcome Page");
});

//Routing
app.get("/about", logger, (req, res, next) => {
  res.send("About Page");
});

app.use(logger, productsRouter);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(8080);
