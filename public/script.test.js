const sum = require("./script");

describe("Test", () => {
    test('result of adding 2 & 1 should be 3', () => {
      expect(sum(2)).toBe(3);
    });
});