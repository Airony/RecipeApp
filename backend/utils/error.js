class InvalidPropertyValueError extends Error {
  constructor(invalidProperty) {
    super(`Invalid value for property : ${invalidProperty}`);
    this.name = "InvalidPropertyValueError";
  }
}

class ObjectNotFoundError extends Error {
  constructor(object) {
    super(`${object} not found.`);
    this.name = "ObjectNotFoundError";
  }
}

module.exports = { InvalidPropertyValueError, ObjectNotFoundError };
