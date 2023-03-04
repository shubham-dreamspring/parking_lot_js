class Validator {
  validateRegNo(registration_no) {
    const pattern = /^\w{2}[\w\d]{8}$/;
    return pattern.test(registration_no);
  }
}

module.exports = Validator;
