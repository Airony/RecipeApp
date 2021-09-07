import { DatabaseError } from "pg-protocol";

export class InvalidPropertyValueError extends Error {
  constructor(invalidProperty: string) {
    super(`Invalid value for property : ${invalidProperty}`);
    this.name = "InvalidPropertyValueError";
  }
}

export class ObjectNotFoundError extends Error {
  constructor(object: string) {
    super(`${object} not found.`);
    this.name = "ObjectNotFoundError";
  }
}

export class ForeignKeyError extends Error {
  constraint?: string;
  table?: string;

  constructor(error: DatabaseError) {
    super(error.message);
    this.constraint = error.constraint;
    this.table = error.table;
    this.name = "ForeignKeyError";
  }
}
