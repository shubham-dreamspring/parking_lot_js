const fs = require("fs");
const path = require("path");
const { ConnectionIssue } = require("./errors/errors");

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
      throw new ConnectionIssue(e.message);
    }
  }

  write(doc, data) {
    try {
      fs.writeFileSync(this.#dbDoc[doc], JSON.stringify(data));
      return data;
    } catch (e) {
      console.log(e);
      throw new ConnectionIssue(e.message);
    }
  }
}

module.exports = Adapter;
