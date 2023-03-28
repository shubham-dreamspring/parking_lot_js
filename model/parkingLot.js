const CustomORM = require("../utils/orm.js");

class ParkingLot {
  park(car) {
    if (car.isValidRegistrationNumber()) {
      try {
        if (car.isParked()) {
          throw new Error("Car already parked");
        }
        car.setSlot(ParkingLot.getEmptySlot());
        car.addCar();
      } catch (e) {
        if (e.message === "No empty slot" || "Car already parked") {
          throw e;
        }
        throw new Error("Something went wrong");
      }
    } else {
      throw new Error("Invalid Registration no");
    }

    return car.allAttributes();
  }

  unpark(car) {
    if (car.isParked()) {
      try {
        const orm = new CustomORM();

        car.deleteCar();
        orm.pushData("emptyslots", car.slot);
      } catch (e) {
        console.log(e);
        throw new Error("Something went wrong");
      }
    } else {
      throw new Error("Car Not found");
    }
  }

  static getEmptySlot() {
    const orm = new CustomORM();
    const slot = orm.deleteLastOne("emptyslots");
    if (!slot) {
      throw new Error("No empty slot");
    }
    return slot;
  }
}

module.exports = ParkingLot;
