/*
9.	Кавычки в тексте

Напишите функцию, которая использует регулярные выражения, принимает строку и заменяет в ней все одинарные кавычки на двойные за исключением знака апострофа (например О’Риордан, aren’t). 

Пример

> console.log(replaceQuotes(“I’m the ‘hero’”));

I’m the “hero” 
/*
9.	Кавычки в тексте
Напишите функцию, которая использует регулярные выражения, принимает строку и заменяет в ней все одинарные кавычки 
на двойные за исключением знака апострофа (например О’Риордан, aren’t). 
Пример
> console.log(replaceQuotes(“I’m the ‘hero’”));
I’m the “hero” 
*/

function replaceQuotes(inputString) {
    return inputString.replace(/'/g, '"');
}

console.log(replaceQuotes(`I'm the 'hero'`));

var str = 'Twas the night before Xmas...';
var newstr = str.replace(/xmas/i, 'Christmas');
console.log(newstr); 