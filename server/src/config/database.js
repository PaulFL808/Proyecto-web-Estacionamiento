const { Sequelize } = require("sequelize");
const env = require("./env");

if (!env.databaseUrl) {
  throw new Error("DATABASE_URL no esta configurada. Revisa .env o las variables del entorno.");
}

const sequelize = new Sequelize(env.databaseUrl, {
  dialect: "mysql",
  logging: env.nodeEnv === "development" ? false : false
});

module.exports = sequelize;
