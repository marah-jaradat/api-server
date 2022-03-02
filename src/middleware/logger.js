"use strict";

const logger = (req, res, next) => {
  console.log(`Logged @ ${req.method} ${req.path}`);
  next();
};

module.exports = logger;
