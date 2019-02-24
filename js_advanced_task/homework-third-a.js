/*
3.	Цепочка промисов:
Для задания 'a':
function random(sumWith) {
    return new Promise(function(resolve) {
      var timeout = Math.random()*3000;
      setTimeout(function(){
        resolve(Math.random()*3+ sumWIth);
    }, timeout)
  })
}

a.	Используя 'random' напишите цепочку промисов, которая будет суммировать 
результат выполнения этой функции 3 раза.
*/

function random(sumWith) {
    return new Promise(function(resolve) {
        const timeout = Math.random()*3000;
        setTimeout(function(){
            resolve(Math.round(Math.random() * 3) + sumWith);
        }, timeout);
    });
}

random(0)
    .then(res => {
        return random(res);
    })
    .then(res => {
        return random(res);
    })
    .then(res => {
        return random(res);
    })
    .then(res => {
        console.log(`final result ${res}`);
    });