const request = require("supertest");
const app = require("../app");

describe("/login API", () => {
  it("should login with valid credentials", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ username: "olav", password: "password123" });
    expect(response.statusCode).toBe(200);
    expect(response.body.data.token).toBeDefined();
  });

  it("should not login with invalid credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "wrongname",
      password: "notrightPassword",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.data.result).toBe(
      "Invalid username/email or password"
    );
  });
});
