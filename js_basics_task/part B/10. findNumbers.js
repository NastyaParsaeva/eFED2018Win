/*
10.	Найти числа
Напишите функцию, которая использует регулярное выражение, принимает массив строк и возвращает только числа, записанные в нотации JavaScript. 
Оно должно поддерживать возможный минус или плюс перед числом, десятичную точку, 
и экспоненциальную запись 5e-3 или 1E10 – опять-таки с возможными плюсом или минусом.
 Также заметьте, что до или после точки не обязательно могут стоять цифры, но при этом число не может состоять из одной точки. 
 То есть, .5 или 5. – допустимые числа, а одна точка сама по себе – нет. 
Пример
> console.log(findNumbers(["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"]));
["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"]
> console.log(findNumbers(["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."]));
[]
*/

function findNumbers(inputArray) {

    let returnArray = inputArray.filter((element) => {
        //number with + or - : ^(\+|-)?\d+$
        //dotted numbers: ^([0-9]+\.)?(\.[0-9]+)?$
        //numbers with e : ^([0-9]+)?\.?\d[eE](\+|-)?\d+$

        var myReg = /^(\+|-)?\d+$/g;
        if (myReg.test(element)) {
            return element;
        }
    });
    return returnArray;
}

console.log(findNumbers(["1", "-1", "+15", "1.55dfgdfg", ".5", "5.", "1", "1.3e2", "1E-4", "1e+12"]));
console.log(findNumbers(["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."]));