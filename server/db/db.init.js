const { sequelize } = require("./db.con");
const Sequelize = require('sequelize');

const Users = require("../models/users.model.js")(sequelize, Sequelize.DataTypes);
const Recipes = require("../models/recipes.model.js")(sequelize, Sequelize.DataTypes);
const Ingredients = require("../models/ingredients.model.js")(sequelize, Sequelize.DataTypes);
const Instructions = require("../models/instructions.model.js")(sequelize, Sequelize.DataTypes);
const RecipesIngredients = require(
  "../models/recipes_ingredients.model.js"
)(sequelize, Sequelize.DataTypes);

sequelize
  .authenticate()
  .then(async () => {
    defineRelations();
    //await Users.sync({ force: true });
    //await Recipes.sync({ force: true });
    //await Ingredients.sync({ force: true });
    //await Instructions.sync({ force: true });
    //await RecipesIngredients.sync({ force: true });

    await sequelize.sync({ force: false });
  })
  .catch((err) => {
    console.error(err);
  });

const defineRelations = () => {
  const common = (options) => ({
    ...options,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  Users.hasMany(Recipes, common({ foreignKey: "user_id" }));
  Recipes.hasMany(Instructions, common({ foreignKey: "recipe_id" }));

  Recipes.belongsToMany(
    Ingredients,
    common({
      through: "t_recipes_ingredients",
      foreignKey: "recipe_id",
      otherKey: "ingredient_id",
    })
  );

  Ingredients.belongsToMany(
    Recipes,
    common({
      through: "t_recipes_ingredients",
      foreignKey: "ingredient_id",
      otherKey: "recipe_id",
    })
  );

  RecipesIngredients.belongsTo(Recipes, { foreignKey: "recipe_id" });
  RecipesIngredients.belongsTo(Ingredients, { foreignKey: "ingredient_id" });
  Recipes.hasMany(RecipesIngredients, common({ foreignKey: "recipe_id" }));
  Ingredients.hasMany(RecipesIngredients, common({ foreignKey: "ingredient_id" }));
};
