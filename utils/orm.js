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

  readAndWrite(doc, result, cb, write = false) {
    try {
      let data = fs.readFileSync(this.#dbDoc[doc], "utf8");
      data = JSON.parse(data);
      result = cb(data);
      if (write) fs.writeFileSync(this.#dbDoc[doc], JSON.stringify(result));
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  findAll(doc, sortProperty = null, limit = null) {
    let result = [];
    result = this.readAndWrite(doc, result, (data) => {
      if (sortProperty)
        data = data.sort(function (x, y) {
          return y[sortProperty] - x[sortProperty];
        });
      if (limit) data = data.slice(0, 3);

      return data;
    });
    return result;
  }

  deleteLastOne(doc) {
    let result;
    this.readAndWrite(
      doc,
      result,
      (data) => {
        result = data.pop();
        return data;
      },
      true
    );
    return result;
  }

  findAndDelete(doc, propertyName, propertyValue) {
    this.readAndWrite(
      doc,
      null,
      (data) => data.filter((c) => c[propertyName] !== propertyValue),
      true
    );
  }

  findById(doc, propertyName, propertyValue) {
    let result = null;
    result = this.readAndWrite(doc, result, (data) =>
      data.find((c) => c[propertyName] === propertyValue)
    );
    return result;
  }

  pushData(doc, instance) {
    this.readAndWrite(
      doc,
      null,
      (data) => {
        data.push(instance);
        return data;
      },
      true
    );
  }
}

module.exports = CustomOrm;
