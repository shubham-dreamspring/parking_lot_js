const Car = require("../model/car");
const { InvalidInput, AlreadyExist } = require("../utils/errors/errors");

describe("Tests for", () => {
  beforeAll(() => {
    Car.reset();
  });

  it("creating car with invalid registration no", () => {
    expect(function () {
      new Car("UPsdaksd93459cd48").create();
    }).toThrowError(InvalidInput);
  });

  it("creating a car", () => {
    new Car("UP12345678").create();
    let cars = Car.findAll();
    expect(cars.length).toBe(1);
    Car.delete("registration_no", "UP12345678");
  });

  it("creating already existed car", () => {
    new Car("WW91827364").create();
    expect(function () {
      new Car("WW91827364").create();
    }).toThrowError(AlreadyExist);
    Car.delete("registration_no", "WW91827364");
  });
});
