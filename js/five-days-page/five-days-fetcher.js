function FiveDaysPageFetcher() {
    Fetcher.apply(this);
}

FiveDaysPageFetcher.prototype = Object.create(Fetcher.prototype);

FiveDaysPageFetcher.prototype.getFiveDaysForecast = function(city, renderFunction, transformFunction, slider) {
    const url = this.createCompleteUrl(FIVE_DAY_WEATHER_ENDPOINT, city);
    this.getDataFromApiThroughFetch(url)
        .then(response => {
            renderFunction(response, transformFunction); 
            slider.initializeSliderElements();
            // console.log(slider);
        });
};

FiveDaysPageFetcher.prototype.getWeatherDetails = function(city, renderFunction1, transformFunction1,
    renderFunction2, transformFunction2) {
    const url = this.createCompleteUrl(WEATHER_DETAILS_ENDPOINT, city);
    this.getDataFromApiThroughFetch(url)
        .then(response => {
            renderFunction1(response, transformFunction1);
            renderFunction2(response, transformFunction2);
        });
};
