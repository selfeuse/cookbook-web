module.exports = (sequelize, Sequelize) => {
    const RecipeIngredient = sequelize.define("t_recipe_ingredients", {
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      recipe_ingredient_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      recipeId: {
        type: Sequelize.INTEGER,
      },
      ingredientId: {
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.STRING,
      },
    });
  
    return RecipeIngredient;
  };