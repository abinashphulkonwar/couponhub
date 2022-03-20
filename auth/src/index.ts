if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import mongoose from "mongoose";

import app from "./app";

const db__url = process.env.DB_URL || "mongodb://auth-mongo-srv/auth";

mongoose
  .connect(db__url)
  .then((res) => {
    console.log("working");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  if (!process.env.JWT_KEY) {
    throw new Error("jwt key not defined");
  }
  console.log("listing on port 3000");
});
