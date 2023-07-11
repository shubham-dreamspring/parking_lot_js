const { RecordNotFound } = require("../utils/errors/errors");
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
    let car = Car.findById("id", this.vehicle_id);
    if (!car) throw new RecordNotFound("car is not there");
    return new Car(car.registration_no, car.id);
  }

  static getEmptySlot() {
    let slots = this.findAll();
    let emptyslots = slots.filter((slot) => !slot.vehicle_id);

    if (!emptyslots.length) {
      throw new RecordNotFound("No empty slot");
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
    if (!filledSlots.length) {
      throw new RecordNotFound("No Filled slot");
    }

    return filledSlots;
  }
  static findAll(sortProperty = null, limit = null) {
    const slots = super.findAll(sortProperty, limit);
    let result = slots.map(
      (slot) => new Slot(slot.id, slot.vehicle_id, slot.timestamp)
    );
    return result;
  }

  static findById(propertyName, propertyValue) {
    const slot = super.findById(propertyName, propertyValue);
    console.log(slot);
    if (!slot) throw new RecordNotFound("No slot find !");
    return new Slot(slot.id, slot.vehicle_id, slot.timestamp);
  }

  static findAndDelete(propertyName, propertyValue) {
    const slot = Slot.findById(propertyName, propertyValue);
    if (!slot) throw new RecordNotFound("No slot find !");
    slot.timestamp = null;
    slot.vehicle_id = null;
    slot.update();
  }
}

module.exports = Slot;
