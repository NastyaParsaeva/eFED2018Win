class FiveDaysPageFetcher extends Fetcher{

    getFiveDaysForecast(city, renderFunction, transformFunction, slider) {
        const url = this.createCompleteUrl(FIVE_DAY_WEATHER_ENDPOINT, city);
        return this.getDataFromApiThroughFetch(url);
        // .then(response => {
        //     renderFunction(response, transformFunction);
        //     slider.initializeSliderElements();
        // });
    }

    getWeatherDetails(city, renderFunction1, transformFunction1, renderFunction2, transformFunction2) {
        const url = this.createCompleteUrl(WEATHER_DETAILS_ENDPOINT, city);
        return this.getDataFromApiThroughFetch(url);
        // .then(response => {
        //     renderFunction1(response, transformFunction1);
        //     renderFunction2(response, transformFunction2);
        // });
    }
}




