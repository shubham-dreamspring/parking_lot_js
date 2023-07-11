const { AlreadyExist, InvalidInput, RecordNotFound } = require("./errors");

const errorHandler = (error, _, response, next) => {
  console.log(`error ${error.message}`);
  let status;
  if (error instanceof AlreadyExist || error instanceof InvalidInput) {
    status = 400;
  } else if (error instanceof RecordNotFound) {
    status = 404;
  } else if (error.status === 404) {
    next(error);
    return;
  } else {
    status = 500;
  }
  response
    .status(status)
    .send({ message: error.message || "Something went Wrong" });
};

module.exports = errorHandler;
