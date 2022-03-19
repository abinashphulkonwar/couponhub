if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import express from "express";
import "express-async-errors";
import { json, Request, Response, NextFunction } from "express";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { loginRouter } from "./routes/login";
import { signupRouter } from "./routes/signup";
import { logoutRouter } from "./routes/logout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { currentUser } from "./middlewares/current-user";
import { requireAuth } from "./middlewares/requrie-auth";
import mongoose from "mongoose";

const app = express();

const db__url = process.env.DB_URL || "mongodb://auth-mongo-srv/auth";

mongoose
  .connect(db__url)
  .then((res) => {
    console.log("working");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("trust proxy", true);

app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === "production",
  })
);

app.use("/api/users", signupRouter);
app.use("/api/users", loginRouter);
app.use("/api/users", logoutRouter);
app.use(currentUser);
app.use(requireAuth);
app.use("/api/users", currentUserRouter);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  if (!process.env.JWT_KEY) {
    throw new Error("jwt key not defined");
  }
  console.log("listing on port 3000");
});
