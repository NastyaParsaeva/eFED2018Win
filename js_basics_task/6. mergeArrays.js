/*
6.	Свертка
Используя метод массива concat, и spread-оператор, напишите функцию, 
которая принимает произвольное количество аргументов, каждый из которых является массивом. 
Переданные массивы нужно преобразовать в один массив, которые не содержит повторяющихся элементов.
Пример
> console.log(mergeArrays([1, 2], [3, 4], [5, 6]));
[1, 2, 3, 4, 5, 6]
> console.log(mergeArrays([1, 2], [2, 4], [4, 6]));
[1, 2, 4, 6]
*/

function mergeArrays(...args) {
    let returnedArray = [];
    returnedArray = [...new Set(returnedArray.concat(...args))];
    return returnedArray;
}

console.log(mergeArrays([1, 2], [3, 4], [5, 6]));
console.log(mergeArrays([1, 2], [2, 4], [4, 6]));