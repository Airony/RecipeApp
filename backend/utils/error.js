class InvalidPropertyValueError extends Error {
  constructor(invalidProperty) {
    super(`Invalid value for property : ${invalidProperty}`);
    this.name = "InvalidPropertyValueError";
  }
}

module.exports = { InvalidPropertyValueError };
