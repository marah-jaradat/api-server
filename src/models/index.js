"use strict";

require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const food = require("./food");
const clothes = require("./clothes");
const collection = require("./collection-class");

const POSTGRES_URI =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL; // npm i sqlite3

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

// const POSTGRES_URL =
//   process.env.DATABASE_URL ||
//   "postgres://marah-jaradat:04021997*Marah@localhost:5432//newDB";

// let sequelizeOptions = {
//   dialectOption: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// };

// let sequelize = new Sequelize(POSTGRES_URL, sequelizeOptions);

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
