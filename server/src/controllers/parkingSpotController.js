const parkingSpotService = require("../services/parkingSpotService");

async function index(_req, res, next) {
  try {
    const data = await parkingSpotService.listParkingSpots();
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

async function store(req, res, next) {
  try {
    const data = await parkingSpotService.createParkingSpot(req.body);
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
}

async function show(req, res, next) {
  try {
    const data = await parkingSpotService.getParkingSpot(req.params.id);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const data = await parkingSpotService.updateParkingSpot(req.params.id, req.body);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    await parkingSpotService.deleteParkingSpot(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  index,
  store,
  show,
  update,
  destroy
};
