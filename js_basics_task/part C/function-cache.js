const add = (n) => (n + 10);
console.log('Simple call', add(3));

function cache(func) {
    var calls = {};
    return function() {
        var key = JSON.stringify(arguments);
        if (!(key in calls)) {
            calls[key] = func.apply(null, arguments);
        }
        return calls[key];
    };
}

const memoizedAdd = cache(add);
console.log(memoizedAdd(3));  // calculated
console.log(memoizedAdd(3));  // cached
console.log(memoizedAdd(4));  // calculated
console.log(memoizedAdd(4));