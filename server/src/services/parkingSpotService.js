const { ParkingSpot } = require("../models");
const httpError = require("../utils/httpError");

const allowedFields = ["code", "floor", "sector", "type", "status", "hourlyRate", "notes"];

function pickParkingSpotPayload(payload) {
  return allowedFields.reduce((data, field) => {
    if (payload[field] !== undefined) {
      data[field] = payload[field];
    }
    return data;
  }, {});
}

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
  return ParkingSpot.create(pickParkingSpotPayload(payload));
}

async function getParkingSpot(id) {
  const parkingSpot = await ParkingSpot.findByPk(id);

  if (!parkingSpot) {
    throw httpError(404, "Plaza no encontrada.");
  }

  return parkingSpot;
}

async function updateParkingSpot(id, payload) {
  const parkingSpot = await getParkingSpot(id);
  await parkingSpot.update(pickParkingSpotPayload(payload));
  return parkingSpot;
}

async function deleteParkingSpot(id) {
  const parkingSpot = await getParkingSpot(id);
  await parkingSpot.destroy();
}

module.exports = {
  listParkingSpots,
  createParkingSpot,
  getParkingSpot,
  updateParkingSpot,
  deleteParkingSpot
};
