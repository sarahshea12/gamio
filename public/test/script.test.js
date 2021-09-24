const script = require("../script");

describe("Test", () => {
    test('result of adding 2 & 1 should be 3', () => {
      expect(script.addition(2)).toBe(3);
    });

    test("returns Hello world", () => {
      expect(script.helloWorld()).toBe("Hello world!")
  })
});