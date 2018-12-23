/*
8.	Повтор
Имеется функция multiplyOrThrow, которая с 50% шансом вместо перемножения входных аргументов 
выбрасывает исключение. Напишите функцию, которая продолжает вызывать функцию multiplyOrThrow до тех пор, 
пока она не выполнится успешно. Убедитесь, что обработчик исключений вашей функции обрабатывает 
только одно исключение 'MultiplicatorUnitFailure'.

function multiplyOrThrow(a, b) {
  if (Math.random() < 0.5) {
    return a * b;
  } else {
    throw ‘MultiplicatorUnitFailure’;
  }
}
*/

function multiplyOrThrow(a, b) {
  if (Math.random() < 0.5) {
    return a * b;
  } else {
    throw 'MultiplicatorUnitFailure';
  }
}

function repeat(a, b) {
  try {
    return multiplyOrThrow(a, b);
  } catch(err) {
    if (err instanceof 'MultiplicatorUnitFailure') {
      return repeat(a, b);
    } else {
      throw err;
    }
  }
}

console.log(repeat(5, 8));
