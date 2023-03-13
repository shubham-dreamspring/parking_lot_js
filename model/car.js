const CustomORM = require("../utils/orms.js");
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
        if (orm.findById("car", "registration_no", this.registration_no)) {
          throw new Error("Car already parked");
        }
        const slot = orm.deleteLastOne("emptyslots");
        if (!slot) {
          throw new Error("No empty slot");
        }
        car = {
          registration_no: this.registration_no,
          slot,
          park_timestamp: Date.now(),
        };
        orm.pushData("car", car);
      } catch (e) {
        if (e.message === "No empty slot" || "Car already parked") {
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
    let car = orm.findById("car", "registration_no", this.registration_no);
    if (car) {
      try {
        orm.findAndDelete("car", "registration_no", this.registration_no);
        orm.pushData("emptyslots", car.slot);
      } catch (e) {
        console.log(e);
        throw new Error("Something went wrong");
      }
    } else {
      throw new Error("Car Not found");
    }
  }
}

module.exports = Car;
