class FiveDaysPageFetcher extends Fetcher{

    getFiveDaysForecast(city, renderFunction, transformFunction, slider) {
        const url = this.createCompleteUrl(FIVE_DAY_WEATHER_ENDPOINT, city);
        return this.getDataFromApiThroughFetch(url);
    }

    getWeatherDetails(city, renderFunction1, transformFunction1, renderFunction2, transformFunction2) {
        const url = this.createCompleteUrl(WEATHER_DETAILS_ENDPOINT, city);
        return this.getDataFromApiThroughFetch(url);
    }
}




