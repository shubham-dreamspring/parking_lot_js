var express = require("express");
const CustomOrm = require("../utils/ORM.js");
const Car = require("../Models/Car.js");
const CarController = require("../controller/cars.controller");
const carController = new CarController();
var router = express.Router();

/* GET users listing. */

router.get("/recents", carController.getRecentCars);
router.get("/getslot", carController.getEmptySlot);
router.get("/:registration_no", carController.getCarByRegNo);

router.post("/park", carController.parkCar);

router.post("/unpark", carController.unparkCar);

router.get("/", carController.getAllCars);

module.exports = router;
