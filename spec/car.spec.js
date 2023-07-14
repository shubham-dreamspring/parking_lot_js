const Car = require("../model/car");
const { InvalidInput, AlreadyExist } = require("../utils/errors/errors");

describe("Cars ", () => {
  beforeEach(() => {
    Car.reset();
  });
  afterAll(() => {
    Car.reset();
  });
  it("will throw error on creation with invalid registration no", () => {
    let car = new Car("UPsdaksd93459cd48");

    expect(function () {
      car.create();
    }).toThrowError(InvalidInput);
  });

  it("will created", () => {
    new Car("UP12345678").create();

    let car = Car.find("registration_no", "UP12345678");
    expect(car.registration_no).toBe("UP12345678");
  });

  it("will throw error on creation with already existed car", () => {
    new Car("WW91827364").create();
    
    expect(function () {
      new Car("WW91827364").create();
    }).toThrowError(AlreadyExist);
  });
});
