/*
5.	Контекст вызова и карринг:

function sumWith(number) {
    return this.currentValue += number;
}
var number = 2;
alert(sumWith(number));

Исправить результат выполнения с 'NaN' на '5' не изменяя функцию 'sumWith' и значение переменной 'number'.
*/

function sumWith(number) {
    return this.currentValue += number;
}

const curriedSumWith = sumWith.bind({
    currentValue: 3,
});

const number = 2;
console.log(curriedSumWith(number));
