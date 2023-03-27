const CustomORM = require("../utils/orm.js");

class ParkingLot {
  park(Car) {
    if (Car.isRegistrationvalid()) {
      try {
        if (Car.isParked()) {
          throw new Error("Car already parked");
        }
        Car.getSlot();
        Car.addCar();
      } catch (e) {
        if (e.message === "No empty slot" || "Car already parked") {
          throw e;
        }
        throw new Error("Something went wrong");
      }
    } else {
      throw new Error("Invalid Registration no");
    }

    return {
      registration_no: Car.registration_no,
      slot: Car.slot,
      park_timestamp: Car.park_timestamp,
    };
  }

  unpark(Car) {
    if (Car.isParked()) {
      try {
        const orm = new CustomORM();

        Car.deleteCar();
        orm.pushData("emptyslots", Car.slot);
      } catch (e) {
        console.log(e);
        throw new Error("Something went wrong");
      }
    } else {
      throw new Error("Car Not found");
    }
  }
}

module.exports = ParkingLot;
