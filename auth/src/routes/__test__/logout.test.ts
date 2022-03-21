import request from "supertest";
import app from "../../app";

it("return a 200 on sucessfull signup", async () => {
  await request(app).get("/api/users/logout").expect(200);
});
