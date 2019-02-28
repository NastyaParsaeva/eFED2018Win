/*
Даны:
Массив: ['Вася', 'Админ', 'John Doe', 'Jane Doe']
 Функция "получения" данных пользователя: function getUserInfo(name) {}
Задача:
Создать цепочку промисов, которая получает список пользователей и выводит массив из объектов: 
{name: '...', age: N}, отсортированный по возрасту.
*/
function getUsers() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve([
                'Вася', 'Админ', 'John Doe', 'Jane Doe'
            ]);
        }, 1000);
    });
}
  
function getUserInfo(name) {
    console.log('Get info of ' + name);
    return {
        age: Math.ceil(Math.random() * 100)
    };
}
  
getUsers()
    .then(res => {
        const usersInfo = res.map(element => {
            return {
                name: element,
                ...getUserInfo(element),
            };
        });
        usersInfo.sort((a, b) => {
            if (a.age < b.age) {
                return -1;
            } else if (a.age === b.age) {
                return 0;
            } else {
                return 1;
            }
        });
        return new Promise(res => {
            res(usersInfo);
        });
    })
    .then(res => {
        console.log(res);
    });