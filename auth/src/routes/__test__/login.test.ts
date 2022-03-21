import request from "supertest";
import app from "../../app";

it("return a 200 on sucessfull login", async () => {
  //   await request(app)
  //     .post("/api/users/login")
  //     .send({
  //       email: "test@gmail.com",
  //       password: "test",
  //     })
  //     .expect(422);
  //   await request(app)
  //     .post("/api/users/login")
  //     .send({
  //       email: "testgmail.com",
  //       password: "testtest1",
  //     })
  //     .expect(422);
  //   await request(app)
  //     .post("/api/users/login")
  //     .send({
  //       email: "test@gmail.com",
  //       password: "",
  //     })
  //     .expect(422);
  //   await request(app)
  //     .post("/api/users/login")
  //     .send({
  //       email: "",
  //       password: "testtest",
  //     })
  //     .expect(422);
  //   await request(app)
  //     .post("/api/users/login")
  //     .send({
  //       email: "",
  //       password: "",
  //     })
  //     .expect(422);
  const respons = await request(app)
    .post("/api/users/login")
    .send({
      email: "test@gmail.com",
      password: "testtest",
    })
    .expect(200);

  expect(respons.get("Set-Cookie")).toBeDefined();
});
