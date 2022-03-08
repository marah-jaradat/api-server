"use strict";

require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const food = require("./food");
const clothes = require("./clothes");
const collection = require("./collection-class");

// const POSTGRES_URI =
//   process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL; // npm i sqlite3

// let sequelizeOptions =
//   process.env.NODE_ENV === "production"
//     ? {
//         dialectOptions: {
//           ssl: {
//             require: true,
//             rejectUnauthorized: false,
//           },
//         },
//       }
//     : {};

// let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const postgresURL =
  process.env.NODE_ENV == "test" ? "sqlite:memory" : process.env.DATABASE_URL;
const sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } }
    : {};
const sequelize = new Sequelize(postgresURL, sequelizeOptions);

let foodModel = food(sequelize, DataTypes);
let clothesModel = clothes(sequelize, DataTypes);

let foodCollection = new collection(foodModel);
let clothesCollection = new collection(clothesModel);

module.exports = {
  db: sequelize,
  foodCollection: foodCollection,
  clothesCollection: clothesCollection,
  // food: food(sequelize, DataTypes),
  // clothes: clothes(sequelize, DataTypes),
};
