import request from "supertest";
import app from "../../app";

it("return a 200 on sucessfull signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test",
    })
    .expect(422);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "testgmail.com",
      password: "test",
    })
    .expect(422);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "testgmail.com",
      password: "",
    })
    .expect(422);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "",
      password: "testtest1",
    })
    .expect(422);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "",
      password: "",
    })
    .expect(422);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "testtest",
    })
    .expect(400);
});
