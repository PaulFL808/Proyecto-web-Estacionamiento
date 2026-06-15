const { Op } = require("sequelize");
const { ActiveParking, ParkingSpot } = require("../models");
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

const validStatuses = ["available", "occupied", "maintenance", "reserved"];
const validTypes = ["standard", "disabled", "electric", "motorcycle"];

function validateParkingSpotPayload(payload, { partial = false } = {}) {
  const data = pickParkingSpotPayload(payload);

  if (!partial || data.code !== undefined) {
    data.code = String(data.code || "").trim().toUpperCase();
    if (!data.code) {
      throw httpError(400, "El codigo de la plaza es obligatorio.");
    }
  }

  if (!partial || data.sector !== undefined) {
    data.sector = String(data.sector || "").trim().toLowerCase();
    if (!data.sector) {
      throw httpError(400, "El sector de la plaza es obligatorio.");
    }
  }

  if (data.floor !== undefined && (!Number.isInteger(Number(data.floor)) || Number(data.floor) < 1)) {
    throw httpError(422, "El piso debe ser un entero mayor o igual a 1.");
  }

  if (data.hourlyRate !== undefined && Number(data.hourlyRate) <= 0) {
    throw httpError(422, "La tarifa por hora debe ser mayor a 0.");
  }

  if (data.status !== undefined && !validStatuses.includes(data.status)) {
    throw httpError(422, "El estado de la plaza no es valido.");
  }

  if (data.type !== undefined && !validTypes.includes(data.type)) {
    throw httpError(422, "El tipo de plaza no es valido.");
  }

  return data;
}

async function listParkingSpots(filters = {}) {
  const where = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.sector) {
    where.sector = filters.sector;
  }

  if (filters.type) {
    where.type = filters.type;
  }

  if (filters.search) {
    where[Op.or] = [
      { code: { [Op.like]: `%${filters.search}%` } },
      { sector: { [Op.like]: `%${filters.search}%` } }
    ];
  }

  return ParkingSpot.findAll({
    where,
    order: [
      ["floor", "ASC"],
      ["sector", "ASC"],
      ["code", "ASC"]
    ]
  });
}

async function createParkingSpot(payload) {
  return ParkingSpot.create(validateParkingSpotPayload(payload));
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
  await parkingSpot.update(validateParkingSpotPayload(payload, { partial: true }));
  return parkingSpot;
}

async function deleteParkingSpot(id) {
  const parkingSpot = await getParkingSpot(id);
  const activeParking = await ActiveParking.findOne({
    where: {
      parkingSpotId: id,
      status: "active"
    }
  });

  if (activeParking) {
    throw httpError(409, "No se puede eliminar una plaza con un vehiculo activo.");
  }

  await parkingSpot.destroy();
}

module.exports = {
  listParkingSpots,
  createParkingSpot,
  getParkingSpot,
  updateParkingSpot,
  deleteParkingSpot
};
