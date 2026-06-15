const { Op } = require("sequelize");
const { ActiveParking, ParkingSpot, sequelize } = require("../models");
const httpError = require("../utils/httpError");

const validStatuses = ["active", "finished", "cancelled"];
const validVehicleTypes = ["car", "motorcycle", "truck"];

function normalizePlate(plate) {
  return String(plate || "").trim().toUpperCase();
}

function includeParkingSpot() {
  return [
    {
      model: ParkingSpot,
      as: "parkingSpot"
    }
  ];
}

function validateActiveParkingPayload(payload, { partial = false } = {}) {
  const data = {};

  if (!partial || payload.parkingSpotId !== undefined) {
    data.parkingSpotId = payload.parkingSpotId;
    if (!data.parkingSpotId) {
      throw httpError(400, "Debes seleccionar una plaza.");
    }
  }

  if (!partial || payload.plate !== undefined) {
    data.plate = normalizePlate(payload.plate);
    if (!data.plate || data.plate.length < 4) {
      throw httpError(422, "La patente debe tener al menos 4 caracteres.");
    }
  }

  if (payload.driverName !== undefined) {
    data.driverName = String(payload.driverName || "").trim() || null;
  }

  if (payload.vehicleType !== undefined) {
    if (!validVehicleTypes.includes(payload.vehicleType)) {
      throw httpError(422, "El tipo de vehiculo no es valido.");
    }
    data.vehicleType = payload.vehicleType;
  }

  if (payload.expectedExitAt !== undefined) {
    data.expectedExitAt = payload.expectedExitAt || null;
  }

  if (payload.status !== undefined) {
    if (!validStatuses.includes(payload.status)) {
      throw httpError(422, "El estado del estacionamiento no es valido.");
    }
    data.status = payload.status;
  }

  return data;
}

async function listActiveParkings(filters = {}) {
  const where = {};
  const include = includeParkingSpot();

  if (filters.status && filters.status !== "all") {
    where.status = filters.status;
  }

  if (!filters.status) {
    where.status = "active";
  }

  if (filters.plate) {
    where.plate = { [Op.like]: `%${normalizePlate(filters.plate)}%` };
  }

  if (filters.parkingSpotId) {
    where.parkingSpotId = filters.parkingSpotId;
  }

  if (filters.sector) {
    include[0].where = { sector: filters.sector };
  }

  return ActiveParking.findAll({
    include,
    where,
    order: [["checkInAt", "DESC"]]
  });
}

async function getActiveParking(id) {
  const activeParking = await ActiveParking.findByPk(id, {
    include: includeParkingSpot()
  });

  if (!activeParking) {
    throw httpError(404, "Registro de estacionamiento no encontrado.");
  }

  return activeParking;
}

async function createActiveParking(payload, user) {
  const data = validateActiveParkingPayload(payload);

  return sequelize.transaction(async (transaction) => {
    const parkingSpot = await ParkingSpot.findByPk(data.parkingSpotId, { transaction });

    if (!parkingSpot) {
      throw httpError(404, "Plaza no encontrada.");
    }

    if (parkingSpot.status === "maintenance" || parkingSpot.status === "reserved") {
      throw httpError(409, "La plaza no esta disponible para registrar entrada.");
    }

    const activeInSpot = await ActiveParking.findOne({
      where: {
        parkingSpotId: data.parkingSpotId,
        status: "active"
      },
      transaction
    });

    if (activeInSpot) {
      throw httpError(409, "La plaza ya tiene un vehiculo activo.");
    }

    const activePlate = await ActiveParking.findOne({
      where: {
        plate: data.plate,
        status: "active"
      },
      transaction
    });

    if (activePlate) {
      throw httpError(409, "La patente ya registra un estacionamiento activo.");
    }

    const created = await ActiveParking.create(
      {
        ...data,
        status: "active",
        createdBy: user?.id || payload.createdBy
      },
      { transaction }
    );

    await parkingSpot.update({ status: "occupied" }, { transaction });

    return ActiveParking.findByPk(created.id, {
      include: includeParkingSpot(),
      transaction
    });
  });
}

async function updateActiveParking(id, payload) {
  const activeParking = await getActiveParking(id);

  if (activeParking.status !== "active") {
    throw httpError(409, "Solo se pueden editar registros activos.");
  }

  await activeParking.update(validateActiveParkingPayload(payload, { partial: true }));
  return getActiveParking(id);
}

async function cancelActiveParking(id) {
  return sequelize.transaction(async (transaction) => {
    const activeParking = await ActiveParking.findByPk(id, { transaction });

    if (!activeParking) {
      throw httpError(404, "Registro de estacionamiento no encontrado.");
    }

    if (activeParking.status !== "active") {
      throw httpError(409, "Solo se pueden cancelar registros activos.");
    }

    await activeParking.update({ status: "cancelled" }, { transaction });
    await ParkingSpot.update(
      { status: "available" },
      {
        where: { id: activeParking.parkingSpotId },
        transaction
      }
    );

    return ActiveParking.findByPk(id, {
      include: includeParkingSpot(),
      transaction
    });
  });
}

async function finishActiveParking(id) {
  return sequelize.transaction(async (transaction) => {
    const activeParking = await ActiveParking.findByPk(id, {
      include: includeParkingSpot(),
      transaction
    });

    if (!activeParking) {
      throw httpError(404, "Registro de estacionamiento no encontrado.");
    }

    if (activeParking.status !== "active") {
      throw httpError(409, "El estacionamiento ya fue cerrado o cancelado.");
    }

    const checkOutAt = new Date();
    const durationMinutes = Math.max(
      1,
      Math.ceil((checkOutAt.getTime() - activeParking.checkInAt.getTime()) / 60000)
    );
    const billedHours = Math.max(1, Math.ceil(durationMinutes / 60));
    const hourlyRate = Number(activeParking.parkingSpot.hourlyRate);
    const totalAmount = billedHours * hourlyRate;

    await activeParking.update(
      {
        checkOutAt,
        durationMinutes,
        totalAmount,
        status: "finished"
      },
      { transaction }
    );

    await activeParking.parkingSpot.update({ status: "available" }, { transaction });

    return ActiveParking.findByPk(id, {
      include: includeParkingSpot(),
      transaction
    });
  });
}

async function deleteActiveParking(id) {
  const activeParking = await getActiveParking(id);

  if (activeParking.status === "active") {
    await cancelActiveParking(id);
  }

  await activeParking.destroy();
}

async function getZoneReport() {
  const spots = await ParkingSpot.findAll({
    include: [
      {
        model: ActiveParking,
        as: "activeParkings",
        required: false,
        where: {
          status: "active"
        }
      }
    ],
    order: [
      ["sector", "ASC"],
      ["code", "ASC"]
    ]
  });

  const zones = new Map();

  spots.forEach((spot) => {
    const sector = spot.sector || "general";
    const zone = zones.get(sector) || {
      sector,
      total: 0,
      available: 0,
      occupied: 0,
      maintenance: 0,
      reserved: 0,
      activeVehicles: 0,
      occupancyRate: 0
    };

    zone.total += 1;
    zone[spot.status] += 1;
    zone.activeVehicles += spot.activeParkings.length;
    zone.occupancyRate = zone.total ? Number(((zone.occupied / zone.total) * 100).toFixed(1)) : 0;
    zones.set(sector, zone);
  });

  return Array.from(zones.values());
}

module.exports = {
  listActiveParkings,
  createActiveParking,
  getActiveParking,
  updateActiveParking,
  cancelActiveParking,
  finishActiveParking,
  deleteActiveParking,
  getZoneReport
};
