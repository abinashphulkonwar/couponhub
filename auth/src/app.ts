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

const app = express();

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

export default app;
