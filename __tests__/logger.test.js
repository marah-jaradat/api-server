"use strict";
const { expect } = require("@jest/globals");
const logger = require("../src/middleware/logger.js");
// const { afterEach } = require("jest-circus");

describe("testing next", () => {
  let req = {};
  let res = {};
  let next = jest.fn();
  it("test", async () => {
    logger(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

describe("testing logger middleware", () => {
  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  // afterEach(()=>{
  //     consoleSpy.mockRestore();
  // })

  it("test log", () => {
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });
  it("test next", () => {
    logger(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
