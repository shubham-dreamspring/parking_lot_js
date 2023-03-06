var express = require("express");
var router = express.Router();
const CustomOrm = require("../utils/ORM.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  const db = new CustomOrm();
  req.app.locals.allCars = db.findAll("car");
  req.app.locals.recentCars = db.findRecentCars();

  res.render("index", {
    title: "Parking Lots",
  });
});

module.exports = router;
