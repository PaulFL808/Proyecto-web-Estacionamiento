const { Router } = require("express");
const authController = require("../controllers/authController");
const parkingSpotController = require("../controllers/parkingSpotController");
const activeParkingController = require("../controllers/activeParkingController");
const authenticate = require("../middlewares/authenticate");

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "estacionamiento-api"
  });
});

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.use(authenticate);

router.get("/plazas", parkingSpotController.index);
router.post("/plazas", parkingSpotController.store);
router.get("/plazas/:id", parkingSpotController.show);
router.put("/plazas/:id", parkingSpotController.update);
router.delete("/plazas/:id", parkingSpotController.destroy);

router.get("/estacionamientos-activos", activeParkingController.index);
router.post("/estacionamientos-activos", activeParkingController.store);

module.exports = router;
