import request from "supertest";
import app from "../../app";
import { Coupon } from "../../db/coupon";

const createUpdateCoupons = async () => {
  const coupondb = new Coupon({
    userId: process.env.USER_ID,
    title: "coupon",
    des: [{ type: "header", data: [{ type: "text", data: "coupon" }] }],
    coupon: "coupon",
    image: "http://couponhub.com/image",
    video: "http://couponhub.com/video",
  });
  await coupondb.save();
  return coupondb;
};

it("return a 200 on sucessfull get coupons", async () => {
  const token = global.getUsrerToken();

  await createUpdateCoupons();
  await createUpdateCoupons();
  await createUpdateCoupons();
  await createUpdateCoupons();
  await createUpdateCoupons();

  const response = await request(app)
    .get("/api/v1/coupon/get")
    .set("Cookie", token)
    .query({ start: 0, limit: 20 })
    .expect(200);

  expect(response.body.length > 0);
});
