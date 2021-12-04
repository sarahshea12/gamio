const script = require("../createEvent");

test("Test if error is thrown", () => {
    var req = 0; 
    var res = 0; 
    expect(() => script.create(req, res)).toThrow(Error);
});