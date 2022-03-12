export class DatabaseConnectionError extends Error {
  statusCode: number = 500;
  reason: string = "Error connection error";

  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeError() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
