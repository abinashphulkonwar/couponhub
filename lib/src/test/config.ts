import mongoose from "mongoose";

const db_url = "mongodb://localhost/coupon-create";

jest.setTimeout(30000);

beforeAll(async () => {
  process.env.JWT_KEY = "sdghfiuerfherfbweidw38384yrfhwbxn";
  process.env.NODE_ENV = "development";
  await mongoose
    .connect(db_url)
    .then((res: any) => {
      console.log("working");
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

afterAll(async () => {});
