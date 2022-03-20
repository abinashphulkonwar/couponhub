import request from "supertest";
import app from "../../app";

it("return a 200 on sucessfull login", async () => {
  const respons = await request(app)
    .post("/api/users/login")
    .send({
      email: "test@gmail.com",
      password: "testtest",
    })
    .expect(200);

  expect(respons.get("Set-Cookie")).toBeDefined();
});
