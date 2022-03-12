import { Request, Response, NextFunction } from "express";

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res.status(400).send("somthin wrong");
};
