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

  findAll(doc, sortProperty = null, limit = null) {
    let data = [];
    try {
      data = fs.readFileSync(this.#dbDoc[doc], "utf8");
      data = JSON.parse(data);
      if (sortProperty)
        data = data.sort(function (x, y) {
          return y[sortProperty] - x[sortProperty];
        });
      if (limit) data = data.slice(0, 3);
    } catch (e) {
      console.log(e);
    }
    return data;
  }
  deleteLastOne(doc) {
    let result;
    try {
      let data = fs.readFileSync(this.#dbDoc[doc], "utf8");
      data = JSON.parse(data);
      result = data.pop();
      fs.writeFileSync(this.#dbDoc[doc], JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
    return result;
  }
  findAndDelete(doc, propertyName, propertyValue) {
    try {
      let data = fs.readFileSync(this.#dbDoc[doc], "utf8");
      data = JSON.parse(data);
      data = data.filter((c) => c[propertyName] !== propertyValue);
      fs.writeFileSync(this.#dbDoc[doc], JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }
  findById(doc, propertyName, propertyValue) {
    let result;
    try {
      let data = fs.readFileSync(this.#dbDoc[doc], "utf8");
      data = JSON.parse(data);
      result = data.find((c) => c[propertyName] === propertyValue);
    } catch (e) {
      console.log(e);
    }
    return result;
  }
  pushData(doc, instance) {
    try {
      let data = fs.readFileSync(this.#dbDoc[doc], "utf8");
      data = JSON.parse(data);
      data.push(instance);
      fs.writeFileSync(this.#dbDoc[doc], JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }

}

module.exports = CustomOrm;
