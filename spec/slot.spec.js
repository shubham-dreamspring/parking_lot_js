const Car = require("../model/car");
const Slot = require("../model/slot");

describe("Slots", () => {
  beforeEach(() => {
    Slot.reset();
  });

  afterEach(() => {
    Slot.reset();
  });

  it("will get empty slot", () => {
    let slot = Slot.getEmptySlot();

    expect(slot.id).toBeDefined();
    expect(slot.timestamp).toBeNull();
    expect(slot.vehicle_id).toBeNull();
  });

  it("will get filled slots", () => {
    let slots = Slot.getFilledSlot();

    expect(slots.length).toBe(0);
  });

  it("will update a slot", () => {
    let slot = Slot.getEmptySlot();

    slot.timestamp = Date.now();
    slot.vehicle_id = 1;
    slot.update();

    expect(Slot.getFilledSlot().length).toBe(1);
  });

  it("will return car of a slot", () => {
    let car = new Car("WW12345678").create();
    let slot = Slot.getEmptySlot();
    slot.timestamp = Date.now();
    slot.vehicle_id = car.id;
    slot.update();

    let carAtSlot = slot.car();

    expect(carAtSlot.registration_no).toBe(car.registration_no);
  });
});
