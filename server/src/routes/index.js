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
router.post("/auth/password-reset/request", authController.requestPasswordReset);
router.post("/auth/password-reset/confirm", authController.resetPassword);

router.use(authenticate);

router.get("/plazas", parkingSpotController.index);
router.post("/plazas", parkingSpotController.store);
router.get("/plazas/:id", parkingSpotController.show);
router.put("/plazas/:id", parkingSpotController.update);
router.delete("/plazas/:id", parkingSpotController.destroy);

router.get("/estacionamientos-activos", activeParkingController.index);
router.post("/estacionamientos-activos", activeParkingController.store);
router.get("/estacionamientos-activos/:id", activeParkingController.show);
router.put("/estacionamientos-activos/:id", activeParkingController.update);
router.patch("/estacionamientos-activos/:id/salida", activeParkingController.finish);
router.patch("/estacionamientos-activos/:id/cancelar", activeParkingController.cancel);
router.delete("/estacionamientos-activos/:id", activeParkingController.destroy);

router.get("/reportes/ocupacion-zona", activeParkingController.zoneReport);

module.exports = router;
