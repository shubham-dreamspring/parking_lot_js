const Slot = require("./slot.js");
const Car = require("./car");

class ParkingLot {
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
    Slot.findAndDelete("vehicle_id", car.id);
    Car.findAndDelete("id", car.id);
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
    let car = Car.findById("registration_no", registration_no);
    let slot = Slot.findById("vehicle_id", car.id);

    return {
      park_timestamp: slot.timestamp,
      registration_no: car.registration_no,
      slot_id: slot.id,
    };
  }
}

module.exports = ParkingLot;
