import { response } from "express";
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
  process.env.UPDATE_OBJECT_ID = coupondb.id;
  await coupondb.save();
};

it("return a 200 on sucessfull update coupon", async () => {
  await createUpdateCoupons();

  const token = global.getUsrerToken();

  const title = "coupon title";

  const response = await request(app)
    .put(`/api/v1/coupon/update/${process.env.UPDATE_OBJECT_ID}`)
    .set("Cookie", token)
    .send({ title: title })
    .expect(200);

  const coupondb = await Coupon.findById({ _id: process.env.UPDATE_OBJECT_ID });
  console.log(coupondb);
  expect(coupondb?.title === title);
});
