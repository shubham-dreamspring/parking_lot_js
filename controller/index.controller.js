const CustomOrm = require("../utils/orms.js");

class IndexController {
  getIndex(req, res, _) {
    const db = new CustomOrm();
    req.app.locals.allCars = db.findAll("car");
    req.app.locals.recentCars = db.findAll("car", "park_timestamp", 3);

    res.render("index", {
      title: "Parking Lot",
    });
  }
}

module.exports = IndexController;
