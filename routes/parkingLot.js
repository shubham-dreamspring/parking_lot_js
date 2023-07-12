const express = require("express");
const ParkingLotController = require("../controller/parkingLotcontroller");

const parkingLotController = new ParkingLotController();
const router = express.Router();

router.get("/initialise", parkingLotController.initialize);

router.post("/park", parkingLotController.parkCar);

router.post("/unpark", parkingLotController.unparkCar);

router.get("/:registration_no", parkingLotController.getCarByRegNo);

module.exports = router;
