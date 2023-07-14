const RegistrationNoValidator = require("../utils/validator.js");
const CustomORM = require("../utils/orm.js");
const { v4: uuidv4 } = require("uuid");
const { InvalidRegNo, CarAlreadyParked } = require("../utils/errors/errors.js");

class Car extends CustomORM {
  static _doc = "car";

  constructor(registration_no, id = null) {
    super(Car._doc);
    this.registration_no = registration_no;
    this.id = id;
  }

  validate() {
    if (!this.isValidRegistrationNumber())
      throw new InvalidRegNo("Not a Valid Registration No");
    if (this.alreadyExist())
      throw new CarAlreadyParked("Car is already parked");
  }

  alreadyExist() {
    let car = Car.find("registration_no", this.registration_no);
    if (car) {
      this.id = car.id;
      return true;
    }
    return false;
  }

  isValidRegistrationNumber() {
    const validator = new RegistrationNoValidator();
    return validator.isValidRegistrationNumber(this.registration_no);
  }

  create() {
    this.validate();
    this.id = uuidv4();
    super.create();
    return this;
  }
}

module.exports = Car;
