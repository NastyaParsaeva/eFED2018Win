/*
•	Доп к заданию 5: Использовать более 1 способа. Создать метод на основе 'sumWIth', 
первый вызов которого будет возвращать 1, а все последующие на 2 больше (например, 1, 3, 5, 7...).
*/

function sumWith(number) {
    return this.currentValue += number;
}

const curriedSumWith = sumWith.bind({
    currentValue: 3,
    sumWith: function(number) {
        this.currentValue +=2;
        return this.currentValue + number;
    }
});

const number = 2;
console.log(curriedSumWith(number));