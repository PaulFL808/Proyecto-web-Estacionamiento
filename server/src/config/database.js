const { Sequelize } = require("sequelize");
const env = require("./env");

if (!env.databaseUrl) {
  throw new Error("DATABASE_URL no esta configurada. Revisa .env o las variables del entorno.");
}

const sequelize = new Sequelize(env.databaseUrl, {
  dialect: "postgres",
  logging: env.nodeEnv === "development" ? false : false,
  dialectOptions:
    env.nodeEnv === "production"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      : {}
});

module.exports = sequelize;
