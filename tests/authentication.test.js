const request = require("supertest");

const app = require("../app");

describe("Authentication API", () => {
  it("should login with valid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "validUsername", password: "validPassword" });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should not login with invalid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "invalidUsername", password: "invalidPassword" });
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Invalid credentials");
  });
});
