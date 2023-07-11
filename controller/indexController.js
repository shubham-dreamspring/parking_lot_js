const ParkingLot = require("../model/parkingLot");

class IndexController {
  getIndex(req, res, _) {
    req.app.locals.allCars = ParkingLot.parkedCars();
    req.app.locals.recentCars = ParkingLot.parkedCars('timestamp',3);

    res.render("index", {
      title: "Parking Lot",
    });
  }
}

module.exports = IndexController;
