
function IndexPageFetcher() {
    Fetcher.apply(this);
}

IndexPageFetcher.prototype = Object.create(Fetcher.prototype);

IndexPageFetcher.prototype.getWeatherDetails = function(city, renderFunction) {
    const completeUrl = this.createCompleteUrl('/data/2.5/weather?units=metric&lang=ru&APPID=', city);
    console.log(completeUrl);
    // let promise = new Promise((getDataFromApiThroughFetch, reject) => {
    //     getDataFromApiThroughFetch(completeUrl);
    // });
    // promise
    //     .then(result => {
    //         console.log(result);
    //         callback(result);
    //     });

    
    this.getDataFromApiThroughFetch(completeUrl, renderFunction);
};

IndexPageFetcher.prototype.getAirPollution = function(coords, callback) {
    const url = `${AIR_POLLUTION_ENDPOINT[0]}${coords}${AIR_POLLUTION_ENDPOINT[1]}`;
    
    //const AIR_POLLUTION_ENDPOINT = ['https://api.openweathermap.org/pollution/v1/co/', `/current.json?appid=${APP_ID}`];
    this.getDataFromApiThroughFetch(url, callback);
};

IndexPageFetcher.prototype.getFiveDaysWeather = function(city, renderFunction1, transformFunction1, 
    renderFunction2, transformFunction2) {
    // url = `${FIVE_DAY_WEATHER_ENDPOINT}${city}`;
    const completeUrl = this.createCompleteUrl('/data/2.5/forecast?units=metric&lang=ru&APPID=', city);
    // console.log(completeUrl, callback1, callback2);
    this.getDataFromApiThroughFetch(completeUrl, renderFunction1, transformFunction1, 
        renderFunction2, transformFunction2);
};

// const myIndexPageFetcher = new IndexPageFetcher();
// myIndexPageFetcher.getWeatherDetails('Izhevsk', (x) => console.log(`callback successfully catched ${x}`));

// myIndexPageFetcher.getFiveDaysWeather('moscow');
