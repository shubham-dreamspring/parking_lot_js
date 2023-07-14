class RegistrationNoValidator {
  isValidRegistrationNumber(registration_no) {
    const pattern = /^[A-Z|a-z]{2}\w{8}$/;
    return pattern.test(registration_no);
  }
}

module.exports = RegistrationNoValidator;
