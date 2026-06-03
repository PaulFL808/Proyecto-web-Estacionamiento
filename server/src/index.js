const app = require("./app");
const env = require("./config/env");
const { sequelize } = require("./models");

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Conexion a PostgreSQL verificada.");

    app.listen(env.port, () => {
      console.log(`API escuchando en http://localhost:${env.port}/api/v1`);
    });
  } catch (error) {
    console.error("No se pudo iniciar la API:", error.message);
    process.exit(1);
  }
}

start();
