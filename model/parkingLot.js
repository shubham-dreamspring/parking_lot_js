const Slot = require("./slot.js");
const Car = require("./car");
const { RecordNotFound } = require("../utils/errors/errors.js");

class ParkingLot {
  static initialise() {
    Car.reset();
    Slot.reset();
  }

  static park(car) {
    let slot = Slot.getEmptySlot();
    slot.vehicle_id = car.id;
    slot.timestamp = Date.now();
    slot.update();

    return {
      registration_no: car.registration_no,
      park_timestamp: slot.timestamp,
      slot_id: slot.id,
    };
  }

  static unpark(car) {
    Slot.delete("vehicle_id", car.id);
    Car.delete("id", car.id);
  }

  static parkedCars(sortProperty = null, limit = null) {
    let slots = Slot.getFilledSlot(sortProperty, limit);
    let result = slots.map((slot) => ({
      slot_id: slot.id,
      registration_no: slot.car().registration_no,
    }));
    return result;
  }

  static findParkedCar(registration_no) {
    let car = Car.find("registration_no", registration_no);
    if (!car) throw new RecordNotFound("Car is not found");
    let slot = Slot.find("vehicle_id", car.id);
    if (!slot) throw new RecordNotFound("Slot is not found");

    return {
      park_timestamp: slot.timestamp,
      registration_no: car.registration_no,
      slot_id: slot.id,
    };
  }
}

module.exports = ParkingLot;
