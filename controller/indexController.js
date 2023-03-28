const Car = require("../model/car");

class IndexController {
  getIndex(req, res, _) {
    req.app.locals.allCars = Car.findAll();
    req.app.locals.recentCars = Car.findAll("park_timestamp", 3);

    res.render("index", {
      title: "Parking Lot",
    });
  }
}

module.exports = IndexController;
