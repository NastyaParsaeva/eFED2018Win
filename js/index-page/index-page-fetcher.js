
function IndexPageFetcher() {
    Fetcher.apply(this);
}

IndexPageFetcher.prototype = Object.create(Fetcher.prototype);

IndexPageFetcher.prototype.getWeatherDetailsAndReturnCoords = function(city, renderFunction) {
    const completeUrl = this.createCompleteUrl(WEATHER_DETAILS_ENDPOINT, city);
    return this.getDataFromApiThroughFetch(completeUrl)
        .then(response => {
            renderFunction(response);
            return coords;
        });
};

IndexPageFetcher.prototype.getAirPollution = function(coords, renderFunction) {
    const url = `${ this.baseUrl }${ AIR_POLLUTION_ENDPOINT[0] }${ coords }${ AIR_POLLUTION_ENDPOINT[1] }${ this.appId }`;
    this.getDataFromApiThroughFetch(url)
        .then(response => {
            renderFunction(response);
        });
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
