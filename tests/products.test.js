const request = require("supertest");
const app = require("../app");

describe("Products API", () => {
  it("should create a new product", async () => {
    const response = await request(app)
      .post("/products")
      .send({ name: "TEST_PRODUCT", category: "TEST_CATEGORY" });
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("TEST_PRODUCT");
    expect(response.body.category).toBe("TEST_CATEGORY");
  });

  // Write similar test cases for other CRUD operations
});
