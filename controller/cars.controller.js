const ORM = require("../utils/orms");
const Car = require("../model/car");
const orm = new ORM();

class CarController {
  getAllCars(_, res, __) {
    let data = orm.findAll("car");
    res.send(data);
  }
  getCarByRegNo(req, res, __) {
    const data = orm.findById(
      "car",
      "registration_no",
      req.params.registration_no
    );
    if (!data) res.status(404).json({ message: "Car not found" });
    res.send(data);
  }
  getRecentCars(_, res, __) {
    const data = orm.findAll("car", "park_timestamp", 3);
    res.send(data);
  }
  getEmptySlot(_, res, __) {
    let data = orm.deleteLastOne("emptyslots");
    res.send(data);
  }
  parkCar(req, res, _) {
    const car = new Car(req.body.registration_no);

    let data;
    try {
      data = car.park();
      res.send(data);
    } catch (e) {
      if (e.message === "Something went wrong")
        res.status(500).send({ message: e.message });

      res.status(400).send({ message: e.message });
    }
  }
  unparkCar(req, res, _) {
    const car = new Car(req.body.registration_no);

    try {
      car.unpark();
      res.send({ message: "Car has been unparked" });
    } catch (e) {
      if (e.message === "Something went wrong")
        res.status(500).send({ message: e.message });

      res.status(404).send({ message: e.message });
    }
  }
}

module.exports = CarController;
