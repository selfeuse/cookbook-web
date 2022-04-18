const Sequelize = require('sequelize');
const dbConfig = require("./db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.ingredients = require("../models/ingredients.model.js")(sequelize, Sequelize.DataTypes);
db.instructions = require("../models/instructions.model.js")(sequelize, Sequelize.DataTypes);
db.recipesIngredients = require(
  "../models/recipes_ingredients.model.js"
)(sequelize, Sequelize.DataTypes);
db.recipes = require("../models/recipes.model.js")(sequelize, Sequelize.DataTypes);
db.users = require("../models/users.model.js")(sequelize, Sequelize.DataTypes);


const common = (options) => ({
  ...options,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.users.hasMany(db.recipes, common({ foreignKey: "user_id" }));
db.recipes.hasMany(db.instructions, common({ foreignKey: "recipe_id" }));

db.recipes.belongsToMany(
  db.ingredients,
  common({
    through: "t_recipes_ingredients",
    foreignKey: "recipe_id",
    otherKey: "ingredient_id",
  })
);

db.ingredients.belongsToMany(
  db.recipes,
  common({
    through: "t_recipes_ingredients",
    foreignKey: "ingredient_id",
    otherKey: "recipe_id",
  })
);

db.recipesIngredients.belongsTo(db.recipes, { foreignKey: "recipe_id" });
db.recipesIngredients.belongsTo(db.ingredients, { foreignKey: "ingredient_id" });
db.recipes.hasMany(db.recipesIngredients, common({ foreignKey: "recipe_id" }));
db.ingredients.hasMany(db.recipesIngredients, common({ foreignKey: "ingredient_id" }));

module.exports = db;