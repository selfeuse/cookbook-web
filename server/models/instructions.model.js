const { Model } = require('sequelize');
const { commonModel, commonOptions } = require('./common.model');

module.exports = function(sequelize, DataTypes) {
  const { TEXT, INTEGER } = DataTypes;
  class Instructions extends Model {}

  Instructions.init(
    {
      ...commonModel,
      step: {
        type: INTEGER,
      },
      instruction: {
        type: TEXT,
      },
    },
    { ...commonOptions, modelName: 't_instructions', sequelize }
  );

  Instructions.beforeSync(() => console.log('Creating the t_instructions table.'));
  Instructions.afterSync(() => console.log('t_instructions table created.'));

  return Instructions;
};