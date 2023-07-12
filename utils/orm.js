const Adapter = require("./adapter.js");
class CustomOrm {
  static _adapter = new Adapter();

  constructor(doc) {
    this._doc = doc;
  }

  static findAll(sortProperty = null, limit = null) {
    return CustomOrm._adapter.readAndWrite(this._doc, (data) => {
      if (sortProperty)
        data = data.sort(function (x, y) {
          return y[sortProperty] - x[sortProperty];
        });
      if (limit) data = data.slice(0, 3);

      return data;
    });
  }

  static delete(propertyName = "id", propertyValue) {
    return CustomOrm._adapter.readAndWrite(
      this._doc,
      (data) => data.filter((c) => c[propertyName] !== propertyValue),
      true
    );
  }

  static reset(data = []) {
    console.log(data, this._doc);
    return CustomOrm._adapter.write(this._doc, data);
  }

  static find(propertyName, propertyValue) {
    return CustomOrm._adapter.readAndWrite(this._doc, (data) =>
      data.find((c) => c[propertyName] === propertyValue)
    );
  }

  create() {
    return CustomOrm._adapter.readAndWrite(
      this._doc,
      (data) => {
        let instance = { ...this };
        delete instance["_doc"];
        if (instance.hasOwnProperty("timestamp")) {
          instance.timestamp = Date.now();
        }
        data.push(instance);
        return data;
      },
      true
    );
  }

  update(updateBy = "id") {
    let instance = { ...this };
    delete instance["_doc"];
    CustomOrm._adapter.readAndWrite(
      this._doc,
      (data) => {
        let index = data.findIndex((ele) => ele[updateBy] === this[updateBy]);
        data[index] = instance;
        return data;
      },
      true
    );
    return instance;
  }
}

module.exports = CustomOrm;
