/*
У массивов есть стандартные методы every и some. 
Они принимают как аргумент некую функцию, которая, будучи вызванной с элементом массива в качестве аргумента, возвращает true или false. 
Так же, как && возвращает true, только если выражения с обеих сторон оператора возвращают true, метод every возвращает true, 
когда функция возвращает true для всех элементов массива. Соответственно, some возвращает true, 
когда заданная функция возвращает true при работе хотя бы с одним из элементов массива. 
Они не обрабатывают больше элементов, чем необходимо – например, если some получает true для первого элемента, он не обрабатывает оставшиеся. 
Напишите функции every и some, которые работают так же, как эти методы, только принимают массив в качестве аргумента.
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

function every(inputArray, inputFunction) {

}

console.log(every([1, 4, NaN, 6], Number.isNaN));