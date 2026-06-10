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

async function createActiveParking(payload, user) {
  return ActiveParking.create({
    ...payload,
    createdBy: user?.id || payload.createdBy
  });
}

module.exports = {
  listActiveParkings,
  createActiveParking
};
