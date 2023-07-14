const {
  CarNotFound,
  NoEmptySlot,
  SlotNotFound,
} = require("../utils/errors/errors");
const CustomOrm = require("../utils/orm");
const Car = require("./car");

class Slot extends CustomOrm {
  static _doc = "slots";

  constructor(id, vehicle_id = null, timestamp = null) {
    super(Slot._doc);
    this.id = id;
    this.timestamp = timestamp;
    this.vehicle_id = vehicle_id;
  }

  car() {
    let car = Car.find("id", this.vehicle_id);
    if (!car) throw new CarNotFound("car is not parked with this id");
    return new Car(car.registration_no, car.id);
  }

  static getEmptySlot() {
    let slots = this.findAll();
    let emptyslots = slots.filter((slot) => !slot.vehicle_id);

    if (!emptyslots.length) {
      throw new NoEmptySlot("No empty slot is available");
    }
    let slot = new Slot(
      emptyslots[0].id,
      emptyslots[0].timestamp,
      emptyslots[0].vehicle_id
    );
    return slot;
  }

  static getFilledSlot(sortProperty = null, limit = null) {
    let slots = this.findAll(sortProperty, limit);
    let filledSlots = slots
      .filter((slot) => slot.vehicle_id)
      .map((slot) => new Slot(slot.id, slot.vehicle_id, slot.timestamp));
    return filledSlots;
  }
  static findAll(sortProperty = null, limit = null) {
    const slots = super.findAll(sortProperty, limit);
    let result = slots.map(
      (slot) => new Slot(slot.id, slot.vehicle_id, slot.timestamp)
    );
    return result;
  }

  static find(propertyName, propertyValue) {
    const slot = super.find(propertyName, propertyValue);
    if (!slot) throw new SlotNotFound("No slot found !");
    return new Slot(slot.id, slot.vehicle_id, slot.timestamp);
  }

  static vacantSlot(propertyName, propertyValue) {
    const slot = Slot.find(propertyName, propertyValue);
    if (!slot) throw new SlotNotFound("No slot found !");
    slot.timestamp = null;
    slot.vehicle_id = null;
    slot.update();
  }

  static reset() {
    let data = [];
    const noOfSlots = process.env.TOTAL_NUMBER_OF_SLOTS || 10;

    for (let i = 1; i <= noOfSlots; i++) {
      data.push({
        id: i,
        timestamp: null,
        vehicle_id: null,
      });
    }
    super.reset(data);
  }
}

module.exports = Slot;
