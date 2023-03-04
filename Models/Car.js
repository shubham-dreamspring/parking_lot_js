const CustomORM = require("../utils/ORM.js");
const Validator = require("../utils/validator.js");
class Car {
  constructor(registration_no) {
    this.registration_no = registration_no;
  }

  park() {
    const validator = new Validator();
    let car;
    if (validator.validateRegNo(this.registration_no)) {
      try {
        const orm = new CustomORM();
        const slot = orm.getEmptySlot();
        if (!slot) {
          throw new Error("No empty slot");
        }
        car = {
          registration_no: this.registration_no,
          slot,
          park_timestamp: Date.now(),
        };
        orm.addCar(car);
      } catch (e) {
        if (e.message === "No empty slot") {
          throw e;
        }
        throw new Error("Something went wrong");
      }
    } else {
      throw new Error("Invalid Registration no");
    }

    return car;
  }

  unpark() {
    const orm = new CustomORM();
    let car = orm.findCarByReg(this.registration_no);
    if (car) {
      try {
        orm.removeCar(this.registration_no);
        orm.addEmptySlot(car.slot);
      } catch (e) {
        console.log(e);
        throw new Error("Something went wrong");
      }
    } else {
      throw "Car Not found";
    }
  }
}

module.exports = Car;
