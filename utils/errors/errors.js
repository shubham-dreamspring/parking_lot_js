class RecordNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "RecordNotFound";
  }
}

class InvalidInput extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidInput";
  }
}

class AlreadyExist extends Error {
  constructor(message) {
    super(message);
    this.name = "AlreadyExist";
  }
}

class ConnectionIssue extends Error {
  constructor(message) {
    super(message);
    this.name = "ConnectionIssue";
  }
}

class CarNotFound extends RecordNotFound {
  constructor(message) {
    super(message);
  }
}
class SlotNotFound extends RecordNotFound {
  constructor(message) {
    super(message);
  }
}
class NoEmptySlot extends RecordNotFound {
  constructor(message) {
    super(message);
  }
}

class NoParkedCar extends RecordNotFound {
  constructor(message) {
    super(message);
  }
}

class InvalidRegNo extends InvalidInput {
  constructor(message) {
    super(message);
  }
}

class CarAlreadyParked extends AlreadyExist {
  constructor(message) {
    super(message);
  }
}
module.exports = {
  RecordNotFound,
  InvalidInput,
  AlreadyExist,
  ConnectionIssue,
  CarNotFound,
  SlotNotFound,
  NoEmptySlot,
  InvalidRegNo,
  NoParkedCar,
  CarAlreadyParked
};
