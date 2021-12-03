const script = require("../createAccount");

test("Test if error is thrown", () => {
    var req = 0; 
    var res = 0; 
    expect(() => script.create(req, res)).toThrow(Error);
});

test("random number generated", () => {
    expect(() => script.getRandomInt(10).anything());
})

const mockRequest = (sessionData, body) => ({
    session: { data: sessionData },
    body,
});

const mockResponse = (sessionData) => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
  //    var username = request.body.username;
  //var password = request.body.password;
 // var email = request.body.email; 
test("Test if event works", () => {
    const req = mockRequest("alskdfa89301423", {username: "Test", password: "SuperSecurePassword", email: "email@email.com"})
    const res = mockResponse(); 

    script.create(req, res)

    expect(req.body.username).toEqual("Test")

})
