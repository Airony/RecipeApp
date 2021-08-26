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

class ForeignKeyError extends Error {
  constructor(error) {
    super(error);
    this.constraint = error.constraint;
    this.table = error.table;
    this.name = "ForeignKeyError";
  }
}

module.exports = {
  InvalidPropertyValueError,
  ObjectNotFoundError,
  ForeignKeyError,
};
