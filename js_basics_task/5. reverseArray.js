/*
5.	Наоборот
Напишите две функции, reverseArray и reverseArrayInPlace. 
Первая получает массив как аргумент и выдаёт новый массив, с обратным порядком элементов. 
Вторая работает как оригинальный метод reverse – она меняет порядок элементов на обратный 
в том же объекте массива, который был ей передан в качестве аргумента. 
Не используйте стандартный метод массива reverse. 
Пример
> console.log(reverseArray([1, 2, 3, 4]));
[4, 3, 2 ,1]
> var array = ['A', 'B', 'C', 'D'];
> reverseArrayInPlace(array);
> console.log(array);
['D', 'C', 'B', 'A']
*/

function reverseArray(inputArray) {
    let reversedArray = [];
    for (let i=inputArray.length - 1; i >=0; i--) {
        reversedArray.push(inputArray[i]);
    }
    return reversedArray;
}

function reverseArrayInPlace(inputArray) {
    let start = 0;
    end = inputArray.length - 1;
    while (start <= end) {
        let temp = inputArray[start];
        inputArray[start] = inputArray[end];
        inputArray[end] = temp;
        start++;
        end--;
    }
}

console.log(reverseArray([1, 2, 3, 4]));

var array = ['A', 'B', 'C', 'D'];
reverseArrayInPlace(array);
console.log(array);