const Validator = require("../utils/validator.js");
const CustomORM = require("../utils/orm.js");
const { v4: uuidv4 } = require('uuid');

class Car extends CustomORM {
  static _doc = "car";

  constructor(registration_no, id = null) {
    super(Car._doc);
    this.registration_no = registration_no;
    this.id = id;
  }

  validate() {
    if (!this.isValidRegistrationNumber()) throw "Not a Valid Reg No";
    if (this.alreadyExist()) throw "Already Exists";
  }

  alreadyExist() {
    let car = Car.findById("registration_no", this.registration_no);
    if (car) {
      this.id = car.id;
      return true;
    }
    return false;
  }

  isValidRegistrationNumber() {
    const validator = new Validator();
    return validator.isValidRegistrationNumber(this.registration_no);
  }

  create() {
    this.validate();
    this.id = uuidv4();
    return super.create();
  }
}

module.exports = Car;
