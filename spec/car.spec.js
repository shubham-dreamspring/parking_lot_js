const Car = require("../model/car");
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
      car.park();
    }).toThrow(new Error("Invalid Registration no"));
  });
  it("park car", () => {
    let car = new Car(this.registration_no);
    let car_details = car.park();
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
    car.unpark();
  });
  it("unpark with not parked registration no", () => {
    expect(function () {
      let car = new Car("KA23123456");
      car.unpark();
    }).toThrow(new Error("Car Not found"));
  });
  it("unpark car", () => {
    let car = new Car(this.registration_no);
    car.park(this.registration_no);
    car.unpark();
    const orm = new ORM();
    let car_in_db = orm.findById(
      "car",
      "registration_no",
      this.registration_no
    );
    expect(car_in_db).toBeUndefined();
  });
});
