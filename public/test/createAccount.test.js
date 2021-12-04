const script = require("../createAccount");

test("Test if error is thrown", () => {
    var req = 0; 
    var res = 0; 
    expect(() => script.create(req, res)).toThrow(Error);
});

test("random number generated", () => {
    expect(() => script.getRandomInt(10).anything());
})