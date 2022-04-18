const { Model } = require('sequelize');
const { commonModel, commonOptions } = require('./common.model');

module.exports = function(sequelize, DataTypes) {
  const { STRING, INTEGER, TEXT, ARRAY } = DataTypes;
  class Recipes extends Model {}

  Recipes.init(
    {
      ...commonModel,
      title: {
        type: STRING,
        allowNull: false,
      },
      dishType: {
        type: STRING,
        allowNull: false,
      },
      image: {
        type: TEXT,
      },
      duration: {
        type: INTEGER,
        allowNull: false,
      },
      rate: {
        type: INTEGER,
      },
      tags: {
        type: ARRAY(TEXT),
      },
    },
    { ...commonOptions, modelName: 't_recipes', sequelize }
  );

  Recipes.beforeSync(() => console.log('Creating the t_recipes table.'));
  Recipes.afterSync(() => console.log('t_recipes table created.'));

  return Recipes;
};