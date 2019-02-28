/*
2.	Промисификация: 
Написать функцию по следующим требованиям:
a.	Функция должна сравнивать 2 числа ( function compare(value1, value2) )
b.	Результат должен возвращаться через 1 секунду (используйте setTimeout вместе с Promise)
i.	-1 если 1-е число меньше 2-го
ii.	0 если числа равны
iii.	1 если 1-е число больше 2-го
*/

function compare(value1, value2) {
    let result;
    if (value1 < value2) {
        result = -1;
    } else if (value1 === value2) {
        result = 0;
    } else {
        result = 1;
    }
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(result);
        }, 1000);
    });
}

compare(12, 12)
    .then(res => {
        console.log(res);
    });