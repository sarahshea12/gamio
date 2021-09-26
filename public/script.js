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

function forEachv2(items, callback) { 
    for(let index = 0; index < items.length; index++){
        callback(items[index]);
    }
}

exports.forEachv2 = forEachv2;

// module.exports = script;
