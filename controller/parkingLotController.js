const Car = require("../model/car");
const ParkingLot = require("../model/parkingLot");

class ParkingLotController {
  getCarByRegNo(req, res, __) {
    const data = ParkingLot.findParkedCar(req.params.registration_no);
    if (!data) res.status(404).json({ message: "Car not found" });
    res.send(data);
  }

  parkCar(req, res, _) {
    try {
      const car = new Car(req.body.registration_no);
      car.create();
      let data = ParkingLot.park(car);
      res.send({ message: "Car has been parked", ...data });
    } catch (e) {
      console.log(e);
      if (e.message === "Something went wrong")
        res.status(500).send({ message: e.message });

      res.status(400).send({ message: e.message });
    }
  }

  unparkCar(req, res, _) {
    try {
      const car = new Car(req.body.registration_no);
      if (!car.alreadyExist()) throw new Error("Car is not parked");
      ParkingLot.unpark(car);
      res.send({ message: "Car has been unparked" });
    } catch (e) {
      console.log(e);
      if (e.message === "Something went wrong")
        res.status(500).send({ message: e.message });

      res.status(404).send({ message: e.message });
    }
  }
}

module.exports = ParkingLotController;
