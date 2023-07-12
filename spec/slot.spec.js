const Car = require("../model/car");
const Slot = require("../model/slot");

describe("Tests for", () => {
  beforeAll(() => {
    Slot.reset();
    Car.reset();
  });

  afterAll(() => {
    Slot.reset();
    Car.reset();
  });

  it("getting empty slot", () => {
    let slot = Slot.getEmptySlot();

    expect(slot.id).toBeDefined();
    expect(slot.timestamp).toBeNull();
    expect(slot.vehicle_id).toBeNull();
  });

  it("getting filled slot", () => {
    let slots = Slot.getFilledSlot();
    expect(slots.length).toBe(0);
  });

  it("updating a slot", () => {
    let slot = Slot.getEmptySlot();
    slot.timestamp = Date.now();
    slot.vehicle_id = 1;
    slot.update();

    expect(Slot.getFilledSlot().length).toBe(1);
    Slot.delete("vehicle_id", 1);
  });

  it("return car of a slot", () => {
    let car = new Car("WW12345678").create();
    
    let slot = Slot.getEmptySlot();
    slot.timestamp = Date.now();
    slot.vehicle_id = car.id;
    slot.update();

    expect(slot.car().registration_no).toBe(car.registration_no);

    Slot.delete("vehicle_id", car.id);
    Car.delete("registration_no", car.registration_no);
  });
});
