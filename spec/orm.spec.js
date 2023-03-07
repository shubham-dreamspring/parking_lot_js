var ORM = require("../utils/ORM");

describe("Test for ORM", () => {
  beforeEach(() => {
    this.orm = new ORM();
    this.car_instance = {
      registration_no: "UP43asdrfw",
      park_timestamp: Date.now(),
      slot: "A4",
    };
    this.orm.pushData("car", this.car_instance);
  });

  afterEach(() => {
    this.orm.deleteLastOne("car");
    delete this.orm;
    delete this.car_instance;
  });

  it("Read data", () => {
    let cars = this.orm.findAll("car");
    expect(cars[cars.length - 1].registration_no).toBe(
      this.car_instance.registration_no
    );
  });
  it("Read recent data", () => {
    let cars = this.orm.findAll("car", "park_timestamp", 1);
    expect(cars[0].registration_no).toBe(this.car_instance.registration_no);
  });
  it("Read filtered result by specific property", () => {
    let car = this.orm.findById(
      "car",
      "registration_no",
      this.car_instance.registration_no
    );
    expect(car).toBeDefined();
  });
});
