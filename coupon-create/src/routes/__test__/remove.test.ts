import { response } from "express";
import request from "supertest";
import app from "../../app";
import { Coupon } from "../../db/coupon";

it("return a 200 on sucessfull remove coupon", async () => {
  const token = global.getUsrerToken();

  const response = await request(app)
    .delete(`/api/v1/coupon/remove/${process.env.OBJECT_ID}`)
    .set("Cookie", token)
    .expect(200);

  const coupondb = await Coupon.findById({ _id: process.env.USER_ID });
  expect(coupondb === null);
});
