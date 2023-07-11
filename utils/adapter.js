const fs = require("fs");
const path = require("path");

class Adapter {
  #dbDoc;

  constructor() {
    this.#dbDoc = {
      car: path.join(__dirname, "..", "db", "cars.json"),
      slots: path.join(__dirname, "..", "db", "slots.json"),
    };
  }

  readAndWrite(doc, cb, write = false) {
    try {
      let data = fs.readFileSync(this.#dbDoc[doc], "utf8");
      data = JSON.parse(data);
      let result = cb(data);
      if (write) fs.writeFileSync(this.#dbDoc[doc], JSON.stringify(result));
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Adapter;
