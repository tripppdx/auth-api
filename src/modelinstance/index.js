"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const clothesModel = require("../models/clothes/model.js");
const foodModel = require("../models/food/model.js");
const Collection = require("../models/data-collection.js");
const userModel = require("../auth/models/users.js");

const DATABASE_URL = process.env.DATABASE_URL || "sqlite::memory:";

const sequelize = new Sequelize(DATABASE_URL);
const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  food: new Collection(food),
  clothes: new Collection(clothes),
  users,
};
