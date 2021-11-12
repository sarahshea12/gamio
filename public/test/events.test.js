const script = require("../events");

test("Test if error is thrown", () => {
    var req = 0; 
    var res = 0; 
    expect(() => script.display(req, res)).toThrow(Error);
});