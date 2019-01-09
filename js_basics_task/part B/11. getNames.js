/*
11.	День и месяц
Напишите функцию, которая принимает объект даты, и возвращает название дня недели и месяца этой даты.
Пример
> console.log(getNames(new Date()));
January, Wednesday
*/

function newGetNames(inputDate) {
    //let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return `${inputDate.toLocaleString('en-US', { month: 'long'})}, ${inputDate.toLocaleString('en-US', { weekday: 'long'})}`;
}
console.log(newGetNames(new Date()));