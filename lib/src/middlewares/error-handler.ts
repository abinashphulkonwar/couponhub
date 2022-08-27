import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).send(err.serializeErrors());
    }
    console.warn(err);
    res.status(400).send([{ message: err.message }]);
  } catch (error: any) {
    res.status(500).send([{ message: error.message }]);
  }
};
