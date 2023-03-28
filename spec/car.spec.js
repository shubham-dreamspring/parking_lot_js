const Car = require("../model/car");
const ParkingLot = require("../model/parkingLot");
const ORM = require("../utils/orm");

describe("Tests for Car", () => {
  beforeAll(() => {
    this.registration_no = "UP23123456";
  });

  afterAll(() => {
    delete this.registration_no;
  });

  it("parking with invalid registration no", () => {
    expect(function () {
      let car = new Car("UPsdaksd93459cd48");
      const parkingLot = new ParkingLot();
      parkingLot.park(car);
    }).toThrow(new Error("Invalid Registration no"));
  });

  it("park car", () => {
    let car = new Car(this.registration_no);
    const parkingLot = new ParkingLot();
    let car_details = parkingLot.park(car);

    expect(car_details.registration_no).toBe(this.registration_no);
    expect(car_details.slot).toBeDefined();
    expect(car_details.park_timestamp).toBeDefined();
    const orm = new ORM();
    let car_in_db = orm.findById(
      "car",
      "registration_no",
      this.registration_no
    );
    expect(car_in_db.registration_no).toBeDefined();
    parkingLot.unpark(car);
  });

  it("unpark with not parked registration no", () => {
    expect(function () {
      let car = new Car("KA23123456");
      const parkingLot = new ParkingLot();
      parkingLot.unpark(car);
    }).toThrow(new Error("Car Not found"));
  });

  it("unpark car", () => {
    let car = new Car(this.registration_no);
    const parkingLot = new ParkingLot();
    parkingLot.park(car);
    parkingLot.unpark(car);

    const orm = new ORM();
    let car_in_db = orm.findById(
      "car",
      "registration_no",
      this.registration_no
    );
    expect(car_in_db).toBeUndefined();
  });
});
