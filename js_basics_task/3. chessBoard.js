/*
3.	Шахматная доска
Напишите функцию, которая принимает ширину и высоту в качестве аргументов. 
Функция должна возвращать строку, представляющую собой сочетание пробелов и символов решетки #, 
в которой линии разделяются символами новой строки. На каждой позиции либо пробел, либо знак #. 
Пример
> console.log(chessBoard(8, 4));

# # # # 
 # # # #
# # # # 
 # # # #
*/

function chessBoard(width, height) {
    let returnString = '';
    for (let rowNumber = 0; rowNumber < height; rowNumber++) {
        for (let cellNumber=0; cellNumber < width; cellNumber++) {
            if (rowNumber%2 === 0) {
                if (cellNumber%2 === 0) {
                    returnString += '#';
                } else {
                    returnString += ' ';
                }
            } else {
                if (cellNumber%2 ===0) {
                    returnString += ' ';
                } else {
                    returnString += '#';
                }
            }
        }
        returnString += '\n';
    }
    return returnString;
}

console.log(chessBoard(8, 4));