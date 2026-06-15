const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const { Op } = require("sequelize");
const { PasswordResetToken, User } = require("../models");
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

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
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

async function requestPasswordReset(payload) {
  const email = normalizeEmail(payload.email);

  if (!email || !email.includes("@")) {
    throw httpError(400, "Ingresa un email valido.");
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return {
      message: "Si el email existe, se generara un token de recuperacion.",
      resetToken: null,
      expiresAt: null
    };
  }

  const token = crypto.randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

  await PasswordResetToken.create({
    userId: user.id,
    tokenHash: hashToken(token),
    expiresAt
  });

  return {
    message: "Token de recuperacion generado para desarrollo local.",
    resetToken: token,
    expiresAt
  };
}

async function resetPassword(payload) {
  const token = String(payload.token || "").trim();
  const password = String(payload.password || "");

  if (!token) {
    throw httpError(400, "El token de recuperacion es obligatorio.");
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    throw httpError(400, `La contrasena debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`);
  }

  const resetToken = await PasswordResetToken.findOne({
    where: {
      tokenHash: hashToken(token),
      usedAt: null,
      expiresAt: {
        [Op.gt]: new Date()
      }
    },
    include: [{ model: User, as: "user" }]
  });

  if (!resetToken || !resetToken.user) {
    throw httpError(422, "Token de recuperacion invalido o expirado.");
  }

  resetToken.user.passwordHash = await bcrypt.hash(password, 10);
  resetToken.usedAt = new Date();

  await resetToken.user.save();
  await resetToken.save();

  return {
    message: "Contrasena actualizada correctamente."
  };
}

module.exports = {
  register,
  login,
  requestPasswordReset,
  resetPassword,
  sanitizeUser
};
