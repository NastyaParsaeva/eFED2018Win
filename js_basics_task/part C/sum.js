function sum(a) {
    let result = a;

    return function test(b) {
        if (b) {
            result += b;
            return test;
        }
        return result;
    };
}

console.log(sum(2)(3)(4)(6)(7)());
