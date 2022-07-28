import mongoose from "mongoose";
import app from "../app";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { Coupon } from "../db/coupon";

declare global {
  var getUsrerToken: () => string[];
}

const db_url = "mongodb://localhost/coupon-create";

jest.setTimeout(30000);

beforeAll(async () => {
  process.env.JWT_KEY = "auisdhoadasdd9awidoiwqandjd";
  process.env.NODE_ENV = "development";
  process.env.USER_ID = new Types.ObjectId().toHexString();
  await mongoose
    .connect(db_url)
    .then((res: any) => {
      console.log("working");
    })
    .catch((err: Error) => {
      console.log(err);
    });
});

const createCoupons = async () => {
  const coupondb = new Coupon({
    userId: process.env.USER_ID,
    title: "coupon",
    des: [{ type: "header", data: [{ type: "text", data: "coupon" }] }],
    coupon: "coupon",
    image: "http://couponhub.com/image",
    video: "http://couponhub.com/video",
  });
  process.env.OBJECT_ID = coupondb.id;
  await coupondb.save();
};

beforeAll(async () => {
  createCoupons();
});

afterAll(async () => {
  const coupondb = await Coupon.find({});

  const couponIds: string[] = [];

  for (let id of coupondb) {
    couponIds.push(id.id);
  }

  await Coupon.deleteMany({ _id: { $in: couponIds } });
});

global.getUsrerToken = () => {
  const jwtToken = jwt.sign({ id: process.env.USER_ID }, process.env.JWT_KEY!);

  const session = { jwt: jwtToken };

  const sessionJSON = JSON.stringify(session);

  const token = Buffer.from(sessionJSON).toString("base64");

  return [`session=${token}`];
};
