module.exports = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DB: process.env.DB_DATABASE,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
