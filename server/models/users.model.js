const { Model } = require('sequelize');
const { commonModel, commonOptions } = require('./common.model');

module.exports = function(sequelize, DataTypes) {
  const { STRING } = DataTypes;
  class Users extends Model {}

  Users.init(
    {
      ...commonModel,
      username: {
        type: STRING,
        allowNull: false,
      },
      password: {
        type: STRING,
        allowNull: false,
      },
      email: {
        type: STRING,
        unique: true,
        allowNull: false,
      },
    },
    { ...commonOptions, modelName: 't_users', sequelize }
  );
  
  Users.beforeSync(() => console.log('Creating the t_users table.'));
  Users.afterSync(() => console.log('t_users table created.'));

  return Users;
};