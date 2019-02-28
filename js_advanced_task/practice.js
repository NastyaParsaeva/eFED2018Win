function f(name) {
    const result = {
        name: name,
        age: Math.random() + 10
    };

    return new Promise(res => {
        res(result)
    });
}

f('Vano')
    .then(res => {
        console.log(res);
    });