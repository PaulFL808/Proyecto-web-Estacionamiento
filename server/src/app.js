const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const env = require("./config/env");
const routes = require("./routes");

const app = express();

app.use(
  cors({
    origin: env.corsOrigin
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", routes);

app.use((_req, res) => {
  res.status(404).json({
    error: true,
    message: "Ruta no encontrada"
  });
});

app.use((error, _req, res, _next) => {
  let status = error.status || 500;
  let message = error.message || "Error interno del servidor";
  let details = error.details;

  if (error.name === "SequelizeValidationError") {
    status = 400;
    message = "Datos invalidos.";
    details = error.errors.map((item) => item.message);
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    status = 409;
    message = "Ya existe un registro con esos datos.";
    details = error.errors.map((item) => item.message);
  }

  if (error.name === "SequelizeForeignKeyConstraintError") {
    status = 409;
    message = "No se puede completar la operacion por registros relacionados.";
  }

  res.status(status).json({
    error: true,
    message,
    details
  });
});

module.exports = app;
