"use strict";

require("dotenv").config();

const server = require("./src/server.js");

// server.start(process.env.PORT || 3001);

const { db } = require("./src/models/index.js");

db.sync()
  .then(() => {
    server.start(process.env.PORT || 3003);
  })
  .catch(console.error);
