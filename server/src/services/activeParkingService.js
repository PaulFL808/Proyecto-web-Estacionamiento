const { ActiveParking, ParkingSpot } = require("../models");

async function listActiveParkings() {
  return ActiveParking.findAll({
    include: [
      {
        model: ParkingSpot,
        as: "parkingSpot"
      }
    ],
    where: {
      status: "active"
    },
    order: [["checkInAt", "DESC"]]
  });
}

async function createActiveParking(payload) {
  return ActiveParking.create(payload);
}

module.exports = {
  listActiveParkings,
  createActiveParking
};
