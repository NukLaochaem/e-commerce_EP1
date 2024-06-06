const request = require("supertest");
const app = require("../app");

let authToken;

beforeAll(async () => {
  const loginResponse = await request(app)
    .post("/auth/login")
    .send({ username: "admin", password: "P@ssword2023" });
  authToken = loginResponse.body.data.token;
});

describe("Categories API", () => {
  let testCategoryId;

  it("should create a new category", async () => {
    const response = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "TEST_CATEGORY" });

    testCategoryId = response.body.data.category.id;
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.data.category.name).toBe("TEST_CATEGORY");
  });

  it("should return a list of categories", async () => {
    const response = await request(app).get("/categories");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(Array.isArray(response.body.data.categories)).toBe(true);
  });

  it("should update a category", async () => {
    const response = await request(app)
      .put(`/categories/${testCategoryId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "Updated Test Category" });

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.updatedCategory.name).toBe(
      "Updated Test Category"
    );
  });

  it("should delete a category", async () => {
    const response = await request(app)
      .delete(`/categories/${testCategoryId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
  });
});
