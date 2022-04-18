const { Model } = require('sequelize');
const { commonModel, commonOptions } = require('./common.model');

module.exports = function(sequelize, DataTypes) {
  const { TEXT } = DataTypes;
  class Ingredients extends Model {}

  Ingredients.init(
    {
      ...commonModel,
      name: {
        type: TEXT,
      },
      image: {
        type: TEXT,
      },
    },
    { ...commonOptions, modelName: 't_ingredients', sequelize }
  );

  Ingredients.beforeSync(() => console.log('Creating the t_instructions table.'));
  Ingredients.afterSync(() => console.log('t_instructions table created.'));

  return Ingredients;
};