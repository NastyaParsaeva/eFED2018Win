/*
•	Доп к заданию 2: Если одно из чисел не передано или передено не число, 
то должна быть проброшена ошибка, информирующая об этом (в setTimeout) 
и перехвачена снаружи метода (используйте методы Promise).
*/

function compareNumbers(number1, number2) {
    let result;
    if (number1 < number2) {
        result = -1;
    } else if (number1 === number2) {
        result = 0;
    } else {
        result = 1;
    }
    return result;
}

function compare(value1, value2) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (typeof value1 !== 'number' || typeof value2 !== 'number') {
                reject(new Error('Both two values must be numbers'));
            }
            resolve(compareNumbers(value1, value2));
        }, 1000);
    });
}

compare(-36, null)
    .then(res => {
        console.log(res);
    })
    // }, reject => {
    //     console.log(`Error happened: ${reject.message}`);
    // })
    .catch(reject => {
        console.log(`Error happened: ${reject.message}`);
    });