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

module.exports = {
  index,
  store
};
