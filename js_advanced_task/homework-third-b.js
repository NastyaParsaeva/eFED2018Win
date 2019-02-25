/*
3.	Цепочка промисов:
Для задания 'b':
function random() {
    return new Promise(function(resolve) {
      var timeout = Math.random()*3000;
      setTimeout(function(){
        resolve(Math.random()*3);
    }, timeout)
  })
}
b.	Используя 'random' и методы Promise выведите в массиве результаты выполнения этой функции 7 раз.
*/

function random() {
    return new Promise(function(resolve) {
        const timeout = Math.random()*3000;
        setTimeout(function(){
            resolve(Math.random()*3);
        }, timeout);
    });
}

const randomResults = [];
random()
    .then(res => {
        randomResults.push(res);
        return random();
    })
    .then(res => {
        randomResults.push(res);
        return random();
    })
    .then(res => {
        randomResults.push(res);
        return random();
    })
    .then(res => {
        randomResults.push(res);
        return random();
    })
    .then(res => {
        randomResults.push(res);
        return random();
    })
    .then(res => {
        randomResults.push(res);
        return random();
    })
    .then(res => {
        randomResults.push(res);
        
    })
    .finally(function() {
        console.log(randomResults);
    });