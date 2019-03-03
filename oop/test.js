var test = (function() {
    var x = 10;

    function z() {
        return z+var();
    }

    function v() {
        return 10;
    }

    return {
        z
    }
})()

console.log(x);