"use strict";

const clothes = (sequelize, DataTypes) =>
  sequelize.define("clothes", {
    clothesColor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clothesSize: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = clothes;
