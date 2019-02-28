/*
•	Доп к заданию 4: Счетчик должен хранить в истории значений счетчика последние 10.
*/

function nextAndPrevCounter() {
    let count = 0;
    const last10values = [];
    
    return function(shouldIncreese = true) {
        if (last10values.length === 10) {
            last10values.shift();
        }
        if(shouldIncreese) {
            last10values.push(++count);
        } else {
            last10values.push(--count);
        }
        return count;
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
console.log(counter(false));
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter(false));
console.log(counter(false));
console.log(counter(false));
console.log(counter());
