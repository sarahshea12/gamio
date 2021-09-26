const script = require("../script");

describe("Test", () => {
    test('result of adding 2 & 1 should be 3', () => {
      expect(script.addition(2)).toBe(3);
    });

    test("returns Hello world", () => {
      expect(script.helloWorld()).toBe("Hello world!")
  })
});

const mockCallback = jest.fn(x => 42 + x);
script.forEachv2([0, 1], mockCallback);