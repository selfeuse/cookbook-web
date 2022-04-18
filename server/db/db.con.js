const Sequelize = require('sequelize');
const dbConfig = require("./db.config.js");

const init = () => {
  const { DB_HOST, DB_USER, DB_DB, DB_PASSWORD } = dbConfig;
  const sequelize = new Sequelize(DB_DB, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres'
  });
  
  return sequelize;
};

module.exports = { sequelize: init() };