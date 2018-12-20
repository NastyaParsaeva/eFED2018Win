/*
Напишите функцию, которая возвращает истину, если переданные в нее объекта равны друг другу по содержимому. 
Поля, значение которых являются примитивами должны сравниваться с помощью оператора ===.
Пример
> console.log(deepCompare({ one: 1, two: '2' }, { one: 1, two: '2' }));
true 
> console.log(deepCompare({ one: 1, two: '2' }, { two: '2' }));
false 
> console.log(deepCompare({ one: 1, two: '2' }, { one: 1 two: 2 }));
false
> console.log(deepCompare({ one: 1, two: '2' }, { two: '2', one: 1 }));
true
*/

function deepCompare(first, second) {
    let areEqual = true;

    for (let prop in first) {
        if (second.hasOwnProperty(prop)) {
            if (first[prop] !== second[prop]) {
                areEqual = false;
                break;
            }
        } else {
            areEqual = false;
            break;
        };
      }
    return areEqual;
}

console.log(deepCompare({ one: 1, two: '2' }, { one: 1, two: '2' }));
console.log(deepCompare({ one: 1, two: '2' }, { two: '2' }));
console.log(deepCompare({ one: 1, two: '2' }, { one: 1, two: 2 }));
console.log(deepCompare({ one: 1, two: '2' }, { two: '2', one: 1 }));