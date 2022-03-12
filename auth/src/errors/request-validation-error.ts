import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  statusCode: number = 422;
  constructor(public errors: ValidationError[]) {
    super();

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.errors.map((err) => {
      return {
        message: err.msg,
        field: err.param,
        value: err.value,
        location: err.location,
      };
    });
  }
}
