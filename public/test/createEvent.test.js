const { session } = require("passport");
const script = require("../createEvent");

test("Test if error is thrown", () => {
    var req = 0; 
    var res = 0; 
    expect(() => script.create(req, res)).toThrow(Error);
});

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
  
test("Test if event works", () => {
    const req = mockRequest({username: "test"}, {username: "Test", date: "10-10-2020", time: "10:00PM", game: "Test", contact: "ContactInfo", details: "details"})
    const res = mockResponse(); 
    req.session.username = "test"

    script.create(req, res);

    expect(req.body.game).toEqual("Test")

})
