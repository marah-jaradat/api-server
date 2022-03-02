"use strict";

function validator(req, res, next) {
  //   console.log(req.query);
  if (req.query.name) {
    next();
  } else {
    next("is not a name");
  }
}
module.exports = validator;
