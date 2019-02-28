/*
•	Доп к заданию 6: Напишите код, который будет выводить текст через 1 секунду, 
потом через 3 после предыдущего, потом через 5 после предыдущего, 
потом через 7  после предыдущего и далее через 9 секунд после предыдущего.
*/

function writeTextAfterDelay(secDelay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`text after ${secDelay} sec`);
        }, secDelay * 1000);
    });
}

writeTextAfterDelay(1)
    .then(res => {
        console.log(res);
        return writeTextAfterDelay(3);
    })
    .then(res => {
        console.log(res);
        return writeTextAfterDelay(5);
    })
    .then(res => {
        console.log(res);
        return writeTextAfterDelay(7);
    })
    .then(res => {
        console.log(res);
        return writeTextAfterDelay(9);
    })
    .then(res => {
        console.log(res);
    });