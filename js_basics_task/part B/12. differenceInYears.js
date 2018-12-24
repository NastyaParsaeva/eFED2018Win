/*12.	Разница в годах
Напишите функцию, которая принимает два объекта дат и возвращает разницу между ними в годах. 
Если результат не является целым числом, округлите результат до одного знака после запятой. 
Для простоты, можно принять за истину что любой год равен 365 дням.
Пример
> console.log(differenceInYears(new Date(2014, 10, 2), new Date(2016, 10, 2)));
2
> console.log(differenceInYears(new Date(2014, 0), new Date(2014, 6)));
0.5
*/

function differenceInYears(date1, date2) {
    let returnNumber = Math.abs(((date1.getTime() - date2.getTime()) / (365 * 24 * 60 * 60 * 1000)));
    return Math.round(returnNumber * 10) / 10;
}

console.log(differenceInYears(new Date(2014, 10, 2), new Date(2016, 10, 2)));
console.log(differenceInYears(new Date(2014, 0), new Date(2014, 6)));
