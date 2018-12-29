/*
У массивов есть стандартные методы every и some. 
Они принимают как аргумент некую функцию, которая, будучи вызванной с элементом массива в качестве аргумента,
возвращает true или false. Так же, как && возвращает true, 
только если выражения с обеих сторон оператора возвращают true, метод every возвращает true, 
когда функция возвращает true для всех элементов массива. Соответственно, some возвращает true, 
когда заданная функция возвращает true при работе хотя бы с одним из элементов массива. 
Они не обрабатывают больше элементов, чем необходимо – например, 
если some получает true для первого элемента, он не обрабатывает оставшиеся. 
Напишите функции every и some, которые работают так же, как эти методы, 
только принимают массив в качестве аргумента.
Пример
> console.log(every([1, 4, NaN, 6], Number.isNaN);
false 
> console.log(every([NaN, NaN], Number.isNaN);
true
> console.log(some([1, 2, 6], Number.isNaN);
false 
> console.log(some([1, 4, NaN, 6], Number.isNaN);
true
*/

function every(inputArray, inputFunc) {

    //find for how many elements input function is true
    let elemsCount = inputArray.reduce((accumulator, current) => {
        return accumulator + inputFunc(current);
    }, 0)

    if (elemsCount === inputArray.length) {
        return true;
    } else {
        return false;
    }
}

function newEvery(inputArray, inputFunc) {
    for (let i = 0; i < inputArray.length; i++) {
        if (!inputFunc(inputArray[i])) {
            return false;
        }
    }
    return true;
}

function some(inputArray, inputFunc) {

     if (inputArray.findIndex(inputFunc) >= 0) {
        return true;
    } else {
        return false;
    }
    
}


console.log(newEvery([NaN, 4, 6, NaN], Number.isNaN));
console.log(newEvery([NaN, NaN], Number.isNaN));
console.log(some([1, 2, 6], Number.isNaN));
console.log(some([15, 4, 8, NaN], Number.isNaN));