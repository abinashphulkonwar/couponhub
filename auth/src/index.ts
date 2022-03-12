import express from "express";
import { json } from "express";
import { currentUserRouter } from "./routes/current-user";
import { loginRouter } from "./routes/login";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

app.use(json());

app.use("/api/users/", signupRouter);
app.use("/api/users", loginRouter);
app.use("/api/users", currentUserRouter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("listing on port 3000");
});
