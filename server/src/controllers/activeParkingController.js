const activeParkingService = require("../services/activeParkingService");

async function index(req, res, next) {
  try {
    const data = await activeParkingService.listActiveParkings(req.query);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

async function store(req, res, next) {
  try {
    const data = await activeParkingService.createActiveParking(req.body, req.user);
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
}

async function show(req, res, next) {
  try {
    const data = await activeParkingService.getActiveParking(req.params.id);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const data = await activeParkingService.updateActiveParking(req.params.id, req.body);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

async function finish(req, res, next) {
  try {
    const data = await activeParkingService.finishActiveParking(req.params.id);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

async function cancel(req, res, next) {
  try {
    const data = await activeParkingService.cancelActiveParking(req.params.id);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    await activeParkingService.deleteActiveParking(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function zoneReport(_req, res, next) {
  try {
    const data = await activeParkingService.getZoneReport();
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  index,
  store,
  show,
  update,
  finish,
  cancel,
  destroy,
  zoneReport
};
