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
  const status = error.status || 500;

  res.status(status).json({
    error: true,
    message: error.message || "Error interno del servidor"
  });
});

module.exports = app;
