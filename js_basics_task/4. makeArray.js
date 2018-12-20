/*
4.	Диапазон
Напишите функцию, принимающую два аргумента, начало и конец диапазона, 
которая возвращает массив, содержащий все числа из этого диапазона, включая начальное и конечное. 
Дополнительно функция должна обрабатывать необязательный третий аргумент – шаг для построения массива. 
Если он не задан, шаг равен единице. 
Если число, указывающее начало диапазона больше, чем число обозначающее конец диапазона, 
то шаг д.б. отрицательным
Пример
> console.log(makeArray(1, 10));
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
> console.log(makeArray(1, 10, 3));
[1, 4, 7, 10]
> console.log(makeArray(10, 1, 2));
[10, 8, 6, 4, 2]
*/

function makeArray(start, end, step) {
    let returnArray = [];
    if (!step) {
        step = 1;
    }
    
    if (start > end) {
        step = -step;
        for (let i = start; i >= end; i+=step) {
            returnArray.push(i);
        }
    } else {
        for (let i = start; i <= end; i+=step) {
            returnArray.push(i);
        }
    }
    return returnArray;
}

console.log(makeArray(1, 10));
console.log(makeArray(1, 10, 3));
console.log(makeArray(10, 1, 2));