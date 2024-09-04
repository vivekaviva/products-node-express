console.log("New project");
const express = require("express");
const path = require("path");

const productsRouter = require("./routes/products");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("Welcome Page");
});

app.use(productsRouter);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(8080);
