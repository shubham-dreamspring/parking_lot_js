const Validator = require("../utils/validator.js");
const CustomORM = require("../utils/orm.js");

class Car {
  constructor(registration_no, slot = null) {
    this.registration_no = registration_no;
    this.park_timestamp = Date.now();
    this.slot = slot;
  }

  isRegistrationvalid() {
    const validator = new Validator();
    return validator.validateRegNo(this.registration_no);
  }

  isParked() {
    const orm = new CustomORM();
    const car = orm.findById("car", "registration_no", this.registration_no);
    if (car) {
      this.slot = car.slot;
      this.park_timestamp = car.park_timestamp;
    }
    return car;
  }

  getSlot() {
    if (this.slot) return this.slot;
    const orm = new CustomORM();
    const slot = orm.deleteLastOne("emptyslots");
    if (!slot) {
      throw new Error("No empty slot");
    }
    this.slot = slot;
    return slot;
  }

  addCar() {
    if (!this.slot) throw error("No slot found");

    const orm = new CustomORM();
    let car = {
      registration_no: this.registration_no,
      slot: this.slot,
      park_timestamp: this.park_timestamp,
    };
    return orm.pushData("car", car);
  }

  deleteCar() {
    const orm = new CustomORM();
    orm.findAndDelete("car", "registration_no", this.registration_no);
  }

  static findAll(sortProperty = null, limit = null) {
    const orm = new CustomORM();
    return orm.findAll("car", sortProperty, limit);
  }

  static findBy(propertyName, propertyValue) {
    const orm = new CustomORM();
    return orm.findById("car", propertyName, propertyValue);
  }
}

module.exports = Car;
