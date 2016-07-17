module.exports = {
    condition: condition,
    equal: equal
}

function condition() {
    var cond = arguments[0],
        arg1 = arguments[1],
        arg2 = arguments[2] || '';
    return cond ? arg1 : arg2;
}

function equal(a, b) {
    return a === b;
}