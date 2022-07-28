import express from "express";
import "express-async-errors";
import { json, Request, Response, NextFunction } from "express";
import cookieSession from "cookie-session";
import { createRoute } from "./routes/create";
import { removeCoupons } from "./routes/remove";
import { errorHandler } from "../../lib";
const app = express();

app.set("trust proxy", true);

app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === "production",
    httpOnly: process.env.NODE_ENV === "production",
  })
);

app.use("/api/v1/coupon", createRoute);
app.use("/api/v1/coupon", removeCoupons);

// app.use(async (req: Request, res: Response, next: NextFunction) => {});

app.use(errorHandler);

export default app;
