const { ParkingSpot } = require("../models");

async function listParkingSpots() {
  return ParkingSpot.findAll({
    order: [
      ["floor", "ASC"],
      ["sector", "ASC"],
      ["code", "ASC"]
    ]
  });
}

async function createParkingSpot(payload) {
  return ParkingSpot.create(payload);
}

module.exports = {
  listParkingSpots,
  createParkingSpot
};
