var express = require("express");
const CustomOrm = require("../utils/ORM.js");
const Car = require("../Models/Car.js");
var router = express.Router();

/* GET users listing. */

router.get("/recents", function (req, res, next) {
  var db = new CustomOrm();
  let data = db.findRecentCars();
  // req.app.locals.listdata = JSON.parse(data);
  res.send(data);
});
router.get("/getslot", function (req, res, next) {
  var db = new CustomOrm();
  let data = db.getEmptySlot();
  // req.app.locals.listdata = JSON.parse(data);
  res.send(data);
});
router.get("/:registration_no", function (req, res, next) {
  var db = new CustomOrm();
  let data = db.findCarByReg(req.params.registration_no);
  res.send(data);
});

router.post("/park", function (req, res, next) {
  const car = new Car(req.body.registration_no);

  let data;
  try {
    data = car.park();
    res.send(data);
  } catch (e) {
    if (e.message === "Something went wrong") res.status(500).send(e.message);

    res.status(400).send(e.message);
  }
});

router.post("/unpark", function (req, res, next) {
  const car = new Car(req.body.registration_no);

  let data;
  try {
    car.unpark();
    res.send("Car has been unparked");
  } catch (e) {
    if (e.message === "Something went wrong") res.status(500).send(e.message);

    res.status(404).send(e.message);
  }
});

router.get("/", function (req, res, next) {
  var db = new CustomOrm();
  let data = db.findAll("car");
  req.app.locals.listdata = data;
  res.send(data);
});

module.exports = router;
