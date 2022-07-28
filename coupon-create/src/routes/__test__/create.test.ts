import { response } from "express";
import request from "supertest";
import app from "../../app";

it("return a 200 on sucessfull create coupon", async () => {
  const token = global.getUsrerToken();

  const response = await request(app)
    .post("/api/v1/coupon/create")
    .set("Cookie", token)
    .send({
      title: "coupon",
      des: [{ type: "header", data: [{ type: "text", data: "coupon" }] }],
      coupon: "coupon",
      image: "http://couponhub.com/image",
      video: "http://couponhub.com/video",
    })
    .expect(200);
});
