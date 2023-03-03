var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // req.app.locals.listdata = [{ registration_no: "AB23131231", slot: "A4" }];
  res.render("index", {
    title: "Parking Lots",
  });
});

module.exports = router;
