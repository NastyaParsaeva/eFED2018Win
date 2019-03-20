
class IndexPageFetcher extends Fetcher {

    getWeatherDetailsAndReturnCoords(city, renderFunction) {
        const completeUrl = this.createCompleteUrl(WEATHER_DETAILS_ENDPOINT, city);
        return this.getDataFromApiThroughFetch(completeUrl);
    }

    getAirPollution(coords, renderFunction) {
        const url = `${this.baseUrl}${AIR_POLLUTION_ENDPOINT[0]}${coords}${AIR_POLLUTION_ENDPOINT[1]}${this.appId}`;
        return this.getDataFromApiThroughFetch(url);
    }

    getFiveDaysWeather(city) {
        const url = this.createCompleteUrl(FIVE_DAY_WEATHER_ENDPOINT, city);
        return this.getDataFromApiThroughFetch(url);
    }
}




