
const { expect } = require('@jest/globals');
const script = require('../script.js'); //import script to be tested

//test for Hello World


test("returns Hello world", () => {
    expect(script.helloWorld()).toBe("Hello world!")
})