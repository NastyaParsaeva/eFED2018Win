/*
6.	setInterval:
Напишите код, который будет 5 раз каждые 2 секунды выводить текст.
*/

var timerId = setInterval(function() {
    console.log('some text');
}, 2000);

setTimeout(function() {
    clearInterval(timerId);
}, 11000);