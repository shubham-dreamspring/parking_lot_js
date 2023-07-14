const Car = require("../model/car");
const ParkingLot = require("../model/parkingLot");
const { RecordNotFound } = require("../utils/errors/errors");

describe("Parking Lot", () => {
  beforeEach(() => {
    ParkingLot.initialise();
  });

  afterEach(() => {
    ParkingLot.initialise();
  });

  it("will park car", () => {
    let car = new Car("UP12345678");
    let car_details = ParkingLot.park(car);

    expect(car_details.registration_no).toBe("UP12345678");
    expect(car_details.slot_id).toBeDefined();
    expect(car_details.park_timestamp).toBeDefined();

    expect(Car.find("registration_no", "UP12345678")).toBeDefined();
    expect(ParkingLot.parkedCars().length).toBe(1);
  });

  it("will not unpark if car is not parked", () => {
    let car = new Car("KA23123456");

    expect(function () {
      ParkingLot.unpark(car);
    }).toThrowError(RecordNotFound);
  });

  it("will unpark car", () => {
    let car = new Car("UP12345678");
    ParkingLot.park(car);

    ParkingLot.unpark(car);

    expect(Car.findAll().length).toBe(0);
    expect(ParkingLot.parkedCars().length).toBe(0);
  });

  it("will give list of all parked cars", () => {
    ParkingLot.park(new Car("UP12345678"));
    ParkingLot.park(new Car("MP12345678"));
    ParkingLot.park(new Car("KP12345678"));
    ParkingLot.park(new Car("JP12345678"));
    ParkingLot.park(new Car("DP12345678"));

    expect(ParkingLot.parkedCars().length).toBe(5);
  });
});
