import express from "express";
import "express-async-errors";
import { json, Request, Response, NextFunction } from "express";
import { currentUserRouter } from "./routes/current-user";
import { loginRouter } from "./routes/login";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";

const app = express();

const db__url = "mongodb://auth-mongo-srv/auth" || "mongodb://localhost/auth";

mongoose
  .connect(db__url)
  .then((res) => {
    console.log("working");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(json());

app.use("/api/users/", signupRouter);
app.use("/api/users", loginRouter);
app.use("/api/users", currentUserRouter);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("listing on port 3000");
});
