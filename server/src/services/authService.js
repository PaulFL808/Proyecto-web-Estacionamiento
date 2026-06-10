const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const { User } = require("../models");
const httpError = require("../utils/httpError");

const PASSWORD_MIN_LENGTH = 8;

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    },
    env.jwtSecret,
    { expiresIn: "8h" }
  );
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function validateRegisterPayload(payload) {
  const name = String(payload.name || "").trim();
  const email = normalizeEmail(payload.email);
  const password = String(payload.password || "");

  if (!name) {
    throw httpError(400, "El nombre es obligatorio.");
  }

  if (!email || !email.includes("@")) {
    throw httpError(400, "Ingresa un email valido.");
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    throw httpError(400, `La contrasena debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`);
  }

  return { name, email, password };
}

async function register(payload) {
  const { name, email, password } = validateRegisterPayload(payload);
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw httpError(409, "Ya existe un usuario registrado con ese email.");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });

  return {
    token: signToken(user),
    user: sanitizeUser(user)
  };
}

async function login(payload) {
  const email = normalizeEmail(payload.email);
  const password = String(payload.password || "");

  if (!email || !password) {
    throw httpError(400, "Email y contrasena son obligatorios.");
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw httpError(401, "Credenciales invalidas.");
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    throw httpError(401, "Credenciales invalidas.");
  }

  return {
    token: signToken(user),
    user: sanitizeUser(user)
  };
}

module.exports = {
  register,
  login,
  sanitizeUser
};
