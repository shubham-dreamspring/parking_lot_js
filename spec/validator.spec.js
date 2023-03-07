var Validator = require("../utils/validator");

describe("Vadiation of registration number", () => {
  beforeAll(() => {
    this.validator = new Validator().validateRegNo;
  });
  afterAll(() => {
    delete this.validator;
  });
  it("Check for correct registration number", () => {
    expect(this.validator("UP72123456")).toBe(true);
    expect(this.validator("UP72asdfgh")).toBe(true);
    expect(this.validator("UP323asd43")).toBe(true);
    expect(this.validator("up323asd43")).toBe(true);
    expect(this.validator("ka323asd43")).toBe(true);
  });

  it("Check for incorrect registration number", () => {
    expect(this.validator("72123456")).toBe(false);
    expect(this.validator("UP72asdfgh32324")).toBe(false);
    expect(this.validator("23323asd43")).toBe(false);
    expect(this.validator("up3-3asd43")).toBe(false);
    expect(this.validator("ka323*sd43")).toBe(false);
    expect(this.validator("23|323sd43")).toBe(false);
    expect(this.validator("ka323 sd43")).toBe(false);
  });
});
