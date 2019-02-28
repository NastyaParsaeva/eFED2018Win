/*
4.	Замыкания:

Написать счетчик с методами:
a.	next - возвращает и увеличивет значение счетчика
b.	prev - возвращает и уменьшает значение счетчика
*/

function nextAndPrevCounter() {
    let count = 0;
    return function(shouldIncreese = true) {
        console.log(shouldIncreese);
        if(shouldIncreese) return ++count;
        return --count;
    };
}

let counter = new nextAndPrevCounter();
console.log(counter());
console.log(counter(false));
console.log(counter());
console.log(counter());
console.log(counter(false));
console.log(counter());
console.log(counter());
console.log(counter(true));
console.log(counter());

