/*
Fetcher – получает данные со стороные сервера
Fetcher – Базовый класс реализует получение данных, хранит базовый url
*/

function Fetcher() {
    this.baseUrl = 'https://api.openweathermap.org';
    this.appId = 'f9a8867923bcc86f488c9142432dd2de';
}

Fetcher.prototype.getDataFromApiThroughFetch = function(url, callback1, callback2) {
    fetch(url)  
        .then(function(response) {  
            if (response.status === 404) {  
                console.log('City not found. Try to find another city. ' +  
                  response.status); 
            }
            // console.log(`{get data from api response ${response}`);
            return response.json();  
        })
        .then(response => {
            callback1(response);
            if (callback2) callback2(response);
        })
        .catch(function(error) {  
            console.log(`Error happened ${error.stack}`);
        });
};

Fetcher.prototype.createCompleteUrl = function(link, parameter) {
    return `${ this.baseUrl }${ link }${ this.appId }&q=${ parameter }`;
};