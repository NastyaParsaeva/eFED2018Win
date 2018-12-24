/*
11.	День и месяц
Напишите функцию, которая принимает объект даты, и возвращает название дня недели и месяца этой даты.
Пример
> console.log(getNames(new Date()));
January, Wednesday
*/

function getNames(inputDate) {
    let returnStr = '';
    switch (inputDate.getMonth()) {
        case 0:
            returnStr += 'January';
            break;
        case 1:
            returnStr += 'February';
            break;
        case 2:
            returnStr += 'March';
            break;
        case 3:
            returnStr += 'April';
            break;
        case 4:
            returnStr += 'May';
            break;
        case 5:
            returnStr += 'June';
            break;
        case 6:
            returnStr += 'July';
            break;
        case 7:
            returnStr += 'August';
            break;
        case 8:
            returnStr += 'September';
            break;
        case 9:
            returnStr += 'October';
            break;
        case 10:
            returnStr += 'November';
            break;
        case 11:
            returnStr += 'December';
            break;
        default:
            returnStr += 'unknownMonth';
            break;
    }
    returnStr += ', ';
    switch (inputDate.getDay()) {
        case 0: 
            returnStr += 'Sunday';
            break;
        case 1:
            returnStr += 'Monday';
            break;
        case 2:
            returnStr += 'Tuesday';
            break;
        case 3:
            returnStr += 'Wednesday';
            break;
        case 4:
            returnStr += 'Thursday';
            break;
        case 5:
            returnStr += 'Friday';
            break;
        case 6:
            returnStr += 'Saturday';
            break;
        default: 
            returnStr += 'unknownDay';
            break;
        }
    return returnStr;
}

console.log(getNames(new Date()));