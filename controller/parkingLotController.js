const Car = require("../model/car");
const ParkingLot = require("../model/parkingLot");

class ParkingLotController {
  getAllCars(_, res, __) {
    let data = Car.findAllCars();
    res.send(data);
  }

  getCarByRegNo(req, res, __) {
    const data = Car.findBy("registration_no", req.params.registration_no);
    if (!data) res.status(404).json({ message: "Car not found" });
    res.send(data);
  }

  getRecentCars(_, res, __) {
    const data = Car.findAll("park_timestamp", 3);
    res.send(data);
  }

  parkCar(req, res, _) {
    const car = new Car(req.body.registration_no);
    const parkingLot = new ParkingLot();

    let data;
    try {
      data = parkingLot.park(car);
      res.send({ message: "Car has been parked", ...data });
    } catch (e) {
      if (e.message === "Something went wrong")
        res.status(500).send({ message: e.message });

      res.status(400).send({ message: e.message });
    }
  }

  unparkCar(req, res, _) {
    const car = new Car(req.body.registration_no);
    const parkingLot = new ParkingLot();

    try {
      parkingLot.unpark(car);
      res.send({ message: "Car has been unparked" });
    } catch (e) {
      if (e.message === "Something went wrong")
        res.status(500).send({ message: e.message });

      res.status(404).send({ message: e.message });
    }
  }
}

module.exports = ParkingLotController;
