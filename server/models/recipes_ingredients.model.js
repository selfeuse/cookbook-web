const { Model } = require('sequelize');
const { commonModel, commonOptions } = require('./common.model');

module.exports = function(sequelize, DataTypes) {
  const { STRING } = DataTypes;
  class RecipesIngredients extends Model {}

  RecipesIngredients.init(
    {
      ...commonModel,
      quantity: {
        type: STRING,
      },
    },
    { ...commonOptions, modelName: 't_recipes_ingredients', sequelize }
  );

  RecipesIngredients.beforeSync(() => console.log('Creating the t_recipes_ingredients table.'));
  RecipesIngredients.afterSync(() => console.log('t_recipes_ingredients table created.'));

  return RecipesIngredients;
};