const { Sequelize } = require("sequelize");
const env = require("./env");

if (!env.databaseUrl) {
  throw new Error("DATABASE_URL no esta configurada. Revisa .env o las variables del entorno.");
}

const isPostgres = env.databaseUrl.startsWith("postgres");

const sequelize = new Sequelize(env.databaseUrl, {
  dialect: isPostgres ? "postgres" : "mysql",
  dialectOptions: isPostgres ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {},
  logging: env.nodeEnv === "development" ? false : false
});

module.exports = sequelize;
