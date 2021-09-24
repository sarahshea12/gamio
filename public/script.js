function helloWorld() {
    console.log("Hello world!");
    return "Hello world!"
}

exports.helloWorld = helloWorld; 

function addition(x) {
    z = x + 1;
    return z;
}

exports.addition = addition;

// module.exports = script;
