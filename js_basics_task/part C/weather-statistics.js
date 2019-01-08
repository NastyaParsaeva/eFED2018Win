/*
14.	Статистика погоды
Напишите функцию, которая должна считать статистику: средняя температура по месяцам (windows wheather), 
по городу и месяцу за определенные годы.
Пример
> console.log(weatherStat(array, {city: “Izhevsk”, date: new Date(2014, 0)}));
-15
*/

function weatherStat(inputArray, searchObj) {
    let arrayWithSearchObj = inputArray.filter(element => {
        if (element.hasOwnProperty(param)) {
            return element;
        } else {
            return "object with specified doesn't exist";
        }
    });
}

