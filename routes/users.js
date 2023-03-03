var express = require("express");
const CustomOrm = require("../utils/ORM.js");
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

router.get("/", function (req, res, next) {
  var db = new CustomOrm();
  let data = db.findAll("car");
  req.app.locals.listdata = data;
  res.send(data);
});

module.exports = router;
