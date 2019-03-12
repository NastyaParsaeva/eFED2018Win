/*
Fetcher – получает данные со стороные сервера
Fetcher – Базовый класс реализует получение данных, хранит базовый url
*/
class Fetcher {
    constructor() {
        this.baseUrl = 'https://api.openweathermap.org';
        this.appId = 'f9a8867923bcc86f488c9142432dd2de';
    }
    getDataFromApiThroughFetch(url, renderFunction1, transformFunction1, renderFunction2, transformFunction2) {
        return fetch(url)
            .then(function (response) {
                if (response.status === 404) {
                    console.log('City not found. Try to find another city. ' +
                        response.status);
                }
                return response.json();
            })
            .catch(function (error) {
                console.log(`Error happened ${error.stack}`);
            });
    }
    createCompleteUrl(link, parameter) {
        return `${this.baseUrl}${link}${this.appId}&q=${parameter}`;
    }
}


