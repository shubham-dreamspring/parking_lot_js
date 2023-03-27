var express = require("express");
const ParkingLotController = require("../controller/parkingLotcontroller");

const parkingLotController = new ParkingLotController();
var router = express.Router();

/* GET users listing. */

router.get("/recents", parkingLotController.getRecentCars);

router.get("/getslot", parkingLotController.getEmptySlot);

router.get("/:registration_no", parkingLotController.getCarByRegNo);

router.post("/park", parkingLotController.parkCar);

router.post("/unpark", parkingLotController.unparkCar);

router.get("/", parkingLotController.getAllCars);

module.exports = router;
