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

module.exports = {
  RecordNotFound,
  InvalidInput,
  AlreadyExist,
  ConnectionIssue,
};
