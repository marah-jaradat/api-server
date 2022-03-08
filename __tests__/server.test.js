"use strict";
const server = require("../src/server");
const supertest = require("supertest");
const request = supertest(server.app);
const { db } = require("../src/models/index");
const { expect, it } = require("@jest/globals");

let id = 1;

describe("testing my API server", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation();
  });

  // it("handles my internal server errors", async () => {
  //   const response = await request.post("/"); // async
  //   expect(response.status).toEqual(500);
  // });

  it("handles not found request", async () => {
    const response = await request.get("/wrongPath");
    expect(response.status).toEqual(404);
  });

  it("bad method", async () => {
    const response = await request.post("/");
    expect(response.status).toEqual(404);
  });

  it("testing /", async () => {
    const response = await request.get("/");
    expect(response.status).toEqual(200);
    expect(response.text).toEqual("home route");
    // console.log(response.text);
  });

  // it("testing/person", async () => {
  //   const response = await request.get("/person");
  //   // expect(response.status).toEqual(200);
  //   expect(typeof response.body).toEqual("object");
  // });
});

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

// describe("testing db router", () => {
//   it("can get list of records", async () => {
//     const response = await request.get("/person");
//     expect(response.status).toBe(200);
//   });
// });
// describe("testing 404", () => {
//   it("testing /person", async () => {
//     const response = await request.get("/wrongPath");
//     expect(response.status).toEqual(404);
//   });

//   it("testing bad method", async () => {
//     id = 1;
//     const response = await request.get("/clothes/1");
//     expect(parseInt(response.body.id)).toEqual(id);
//   });
// });

// describe("testing my server", () => {
//   it("testing/", async () => {
//     const response = await request.get("/");
//     // console.log(response);
//     expect(response.text).toEqual("home route");
//   });

//   it("testing/person", async () => {
//     const response = await request.get("/person");
//     expect(typeof response.body).toEqual("object");
//   });
// });

describe("testing food route", () => {
  it("testing get food", async () => {
    const response = await request.get("/food");
    expect(response.status).toEqual(200);
  });

  it("post new food", async () => {
    const response = await request.post("/food").send({
      foodName: "test",
      foodMainIngredient: "test",
    });
    expect(response.status).toEqual(201);
    id = response.body.id;
  });

  it("testing get food by id", async () => {
    const response = await request.get(`/food/${id}`);
    expect(response.status).toEqual(200);
  });

  it("testing update food", async () => {
    const response = await request.put(`/food/${id}`).send({
      foodName: "test",
      foodMainIngredient: "test",
    });
    expect(response.status).toEqual(201);
  });
  it("testing delete food", async () => {
    const response = await request.delete(`/food/${id}`);
    expect(response.status).toEqual(204);
  });
});

describe("testing clothes route", () => {
  it("testing get clothes", async () => {
    const response = await request.get("/clothes");
    expect(response.status).toEqual(200);
  });

  it("post new clothes", async () => {
    const response = await request.post("/clothes").send({
      clothesColor: "test",
      clothesSize: "test",
    });
    expect(response.status).toEqual(201);
    id = response.body.id;
  });

  it("testing get clothes by id", async () => {
    const response = await request.get(`/clothes/${id}`);
    expect(response.status).toEqual(200);
  });

  it("testing update clothes", async () => {
    const response = await request.put(`/clothes/${id}`).send({
      clothesColor: "test",
      clothesSize: "test",
    });
    expect(response.status).toEqual(201);
  });

  it("testing delete clothes", async () => {
    const response = await request.delete(`/clothes/${id}`);
    expect(response.status).toEqual(204);
  });
});
