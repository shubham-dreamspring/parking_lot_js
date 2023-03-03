const fs = require("fs");
const path = require("path");

class CustomOrm {
  #dbDoc;
  constructor() {
    this.#dbDoc = {
      car: path.join(__dirname, "..", "db", "cars.json"),
      emptyslots: path.join(__dirname, "..", "db", "emptyslots.json"),
    };
  }

  findAll(doc) {
    let data = [];
    try {
      data = fs.readFileSync(this.#dbDoc[doc], "utf8");
      data = JSON.parse(data);
    } catch (e) {
      console.log(e);
    }
    return data;
  }
  findCarByReg(registration_no) {
    let car;
    try {
      let data = fs.readFileSync(this.#dbDoc["car"], "utf8");
      data = JSON.parse(data);
      car = data.find((c) => c.registration_no === registration_no);
    } catch (e) {
      console.log(e);
    }
    return car;
  }
  findRecentCars() {
    let data = [];
    try {
      data = fs.readFileSync(this.#dbDoc["car"], "utf8");
      data = JSON.parse(data);
      data = data.sort(function (x, y) {
        return y.park_timestamp - x.park_timestamp;
      });
      data = data.slice(0, 3);
    } catch (e) {
      console.log(e);
    }
    return data;
  }

  getEmptySlot() {
    let emptySlot;
    try {
      let data = fs.readFileSync(this.#dbDoc["emptyslots"], "utf8");
      data = JSON.parse(data);
      emptySlot = data.pop();
      fs.writeFileSync(this.#dbDoc["emptyslots"], JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
    return emptySlot;
  }

  addCar(car) {
    try {
      let data = fs.readFileSync(this.#dbDoc["car"], "utf8");
      data = JSON.parse(data);
      data = data.push(car);
      fs.writeFileSync(this.#dbDoc["car"], JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }

  removeCar(registration_no) {
    try {
      let data = fs.readFileSync(this.#dbDoc["car"], "utf8");
      data = JSON.parse(data);
      data = data.filter((c) => c.registration_no !== registration_no);
      fs.writeFileSync(this.#dbDoc["car"], JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }

  addEmptySlot(slot_id) {
    try {
      let data = fs.readFileSync(this.#dbDoc["emptyslot"], "utf8");
      data = JSON.parse(data);
      data = data.filter((c) => c !== slot_id);
      fs.writeFileSync(this.#dbDoc["car"], JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = CustomOrm;
