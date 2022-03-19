import { CustomError } from "./custom-error";

export class AuthError extends CustomError {
  statusCode = 401;

  constructor() {
    super("not authorized");

    Object.setPrototypeOf(this, AuthError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: "not authorized",
      },
    ];
  }
}
