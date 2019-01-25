function sum(a) {
    var result  = a;

    return function test(b) {
        if (b) {
            result += b;
            return test;
        } else {
            return result;
        }
    }
}

console.log(sum(2)(3)(4)(6)(7)());