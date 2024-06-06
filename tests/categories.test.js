const request = require("supertest");
const app = require("../app");

describe("Categories API", () => {
  it("should create a new category", async () => {
    const response = await request(app)
      .post("/categories")
      .send({ name: "TEST_CATEGORY" });
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("TEST_CATEGORY");
  });

  // Write similar test cases for other CRUD operations
});
