const express = require("express");
const ParkingLotController = require("../controller/parkingLotcontroller");

const parkingLotController = new ParkingLotController();
const router = express.Router();

router.get("/recents", parkingLotController.getRecentCars);

router.get("/:registration_no", parkingLotController.getCarByRegNo);

router.post("/park", parkingLotController.parkCar);

router.post("/unpark", parkingLotController.unparkCar);

router.get("/", parkingLotController.getAllCars);

module.exports = router;
