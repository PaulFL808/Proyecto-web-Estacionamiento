const { Router } = require("express");
const parkingSpotController = require("../controllers/parkingSpotController");
const activeParkingController = require("../controllers/activeParkingController");

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "estacionamiento-api"
  });
});

router.get("/plazas", parkingSpotController.index);
router.post("/plazas", parkingSpotController.store);
router.get("/estacionamientos-activos", activeParkingController.index);
router.post("/estacionamientos-activos", activeParkingController.store);

module.exports = router;
