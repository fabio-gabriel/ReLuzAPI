const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const server = require("http").createServer(app);
const port = process.env.PORT_API;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Métodos permitidos
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Cabeçalhos permitidos
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.static(path.join(__dirname, "/public")));
app.use("/images", express.static("data/images"));

const routes = require("./routes/routes");
app.use("/", routes);

server.listen(port, function () {
  console.log("Server listening on port " + port);
});
