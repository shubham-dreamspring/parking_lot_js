const Car = require("../model/car");
const ParkingLot = require("../model/parkingLot");

class ParkingLotController {
  getCarByRegNo(req, res, next) {
    try {
      const data = ParkingLot.findParkedCar(req.params.registration_no);
      res.send(data);
    } catch (e) {
      next(e);
    }
  }

  parkCar(req, res, next) {
    try {
      const car = new Car(req.body.registration_no);
      let data = ParkingLot.park(car);
      res.send({ message: "Car has been parked", ...data });
    } catch (e) {
      next(e);
    }
  }

  unparkCar(req, res, next) {
    try {
      const car = new Car(req.body.registration_no);
      ParkingLot.unpark(car);
      res.send({ message: "Car has been unparked" });
    } catch (e) {
      next(e);
    }
  }

  initialize(req, res, next) {
    try {
      ParkingLot.initialise();
      res.send({ message: "Parking lot has been initialised" });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

module.exports = ParkingLotController;
