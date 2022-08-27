import express from "express";
import "express-async-errors";
import { json, Request, Response, NextFunction } from "express";
import cookieSession from "cookie-session";
import { createRoute } from "./routes/create";
import { removeCoupons } from "./routes/remove";
import { updateRoute } from "./routes/update";
import { errorHandler, NotFoundError } from "../../lib";
import { createUserListner } from "./event/socket-io-client";
import { getRoutes } from "./routes/get-coupons";
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
app.use("/api/v1/coupon", updateRoute);
app.use("/api/v1/coupon", getRoutes);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

app.use(errorHandler);

createUserListner();

export default app;
