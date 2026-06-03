const activeParkingService = require("../services/activeParkingService");

async function index(_req, res, next) {
  try {
    const data = await activeParkingService.listActiveParkings();
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

async function store(req, res, next) {
  try {
    const data = await activeParkingService.createActiveParking(req.body);
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  index,
  store
};
