import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (err instanceof RequestValidationError) {
      res.status(err.statusCode).send(err.serializeError());
    }

    if (err instanceof DatabaseConnectionError) {
      res.status(err.statusCode).send(err.serializeError());
    }
  } catch (error: any) {
    res.status(500).send([{ message: error.message }]);
  }
};
