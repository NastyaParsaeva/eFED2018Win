
function IndexPageFetcher() {
    Fetcher.apply(this);
}

IndexPageFetcher.prototype = Object.create(Fetcher.prototype);

IndexPageFetcher.prototype.getWeatherDetails = function(city, renderFunction) {
    const completeUrl = this.createCompleteUrl(WEATHER_DETAILS_ENDPOINT, city);
    this.getDataFromApiThroughFetch(completeUrl)
        .then(response => {
            renderFunction(response);
        });
};

IndexPageFetcher.prototype.getAirPollution = function(coords, callback) {
    const url = `${AIR_POLLUTION_ENDPOINT[0]}${coords}${AIR_POLLUTION_ENDPOINT[1]}`;
    
    //const AIR_POLLUTION_ENDPOINT = ['https://api.openweathermap.org/pollution/v1/co/', `/current.json?appid=${APP_ID}`];
    this.getDataFromApiThroughFetch(url, callback);
};

IndexPageFetcher.prototype.getFiveDaysWeather = function(city, renderFunction1, transformFunction1, 
    renderFunction2, transformFunction2) {
    const url = this.createCompleteUrl(FIVE_DAY_WEATHER_ENDPOINT, city);
    this.getDataFromApiThroughFetch(url)
        .then(response => {
            renderFunction1(response, transformFunction1);
            renderFunction2(response, transformFunction2);
        });
};
