"use strict";

// Requires
// const { req, res } = require("express");
const express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger");
const errorHandler = require("./error-handlers/500");
const notFound = require("./error-handlers/404");
const foodRoute = require("./routes/food");
const clothesRoute = require("./routes/clothes");

const app = express();

// Express-Middleware
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(foodRoute);
app.use(clothesRoute);

// My-Routes
app.get("/", (req, res) => {
  res.send("home route");
});

// app.get("/data", (req, res) => {
//   res.status(200).json({
//     name: "Marah",
//     email: "marahjaradat97@gmail.com",
//   });
// });

app.use(errorHandler);
app.use("*", notFound);

function start(port) {
  app.listen(port, () => {
    console.log(`running on port ${port}`);
  });
}

module.exports = {
  app: app,
  start: start,
};
