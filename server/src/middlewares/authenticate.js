const jwt = require("jsonwebtoken");
const env = require("../config/env");
const { User } = require("../models");
const { sanitizeUser } = require("../services/authService");
const httpError = require("../utils/httpError");

async function authenticate(req, _res, next) {
  try {
    const header = req.get("Authorization") || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw httpError(401, "Token de autenticacion requerido.");
    }

    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findByPk(payload.sub);

    if (!user) {
      throw httpError(401, "Token de autenticacion invalido.");
    }

    req.user = sanitizeUser(user);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      next(httpError(401, "Token de autenticacion expirado."));
      return;
    }

    if (error.name === "JsonWebTokenError") {
      next(httpError(401, "Token de autenticacion invalido."));
      return;
    }

    next(error);
  }
}

module.exports = authenticate;
