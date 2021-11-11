const script = require("../editAccount");

test("Test if error is thrown", () => {
    var req = 0; 
    var res = 0; 
    expect(() => script.update(req, res)).toThrow(Error);
});
