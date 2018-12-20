/*Напишите функцию, которая принимает строку и символ в качестве аргументов и 
возвращает количество символов в данной строке. Подсчет должен происходить независимо от регистра.
Пример

> console.log(countChar('My Random String', 'm'));
*/

function countChar(inputString, desiredLetter) {
    inputString = inputString.toLowerCase();
    desiredLetter = desiredLetter.toLowerCase();
    let letterCount = 0;
    for (let i = 0; i < inputString.length; i++) {
        if (inputString.charAt(i) === desiredLetter) {
            letterCount++;
        }
    }
    return letterCount;

}

console.log(countChar('My Random String', 'm'));