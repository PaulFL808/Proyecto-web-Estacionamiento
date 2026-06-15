const sequelize = require("../config/database");
const defineUser = require("./User");
const defineParkingSpot = require("./ParkingSpot");
const defineActiveParking = require("./ActiveParking");
const definePasswordResetToken = require("./PasswordResetToken");

const models = {
  User: defineUser(sequelize),
  ParkingSpot: defineParkingSpot(sequelize),
  ActiveParking: defineActiveParking(sequelize),
  PasswordResetToken: definePasswordResetToken(sequelize)
};

Object.values(models).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

module.exports = {
  sequelize,
  ...models
};
