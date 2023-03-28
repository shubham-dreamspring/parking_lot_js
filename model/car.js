const Validator = require("../utils/validator.js");
const CustomORM = require("../utils/orm.js");
const ParkingLot = require("./parkingLot.js");

class Car {
  constructor(registrationNo) {
    this.registrationNo = registrationNo;

    const orm = new CustomORM();
    const car = orm.findById("car", "registration_no", registrationNo);

    if (car) {
      this.park_timestamp = car.park_timestamp;
      this.slot = car.slot;
    } else {
      this.park_timestamp = Date.now();
      this.slot = null;
    }
  }

  isValidRegistrationNumber() {
    const validator = new Validator();
    return validator.isValidRegistrationNumber(this.registrationNo);
  }

  isParked() {
    return this.slot ? true : false;
  }

  getSlot() {
    return this.slot;
  }

  setSlot(slot) {
    this.slot = slot;
  }

  allAttributes() {
    return {
      registration_no: this.registrationNo,
      slot: this.slot,
      park_timestamp: this.park_timestamp,
    };
  }

  addCar() {
    if (!this.slot) throw error("No slot found");

    const orm = new CustomORM();
    return orm.pushData("car", this.allAttributes());
  }

  deleteCar() {
    const orm = new CustomORM();
    orm.findAndDelete("car", "registration_no", this.registrationNo);
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
