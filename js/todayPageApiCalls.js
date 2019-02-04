const APP_ID = 'f9a8867923bcc86f488c9142432dd2de';
const WEATHER_DETAILS_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&APPID=${APP_ID}&q=`;
const AIR_POLLUTION_ENDPOINT = ['http://api.openweathermap.org/pollution/v1/co/', `/current.json?appid=${APP_ID}`];
const FIVE_DAY_WEATHER_ENDPOINT = `http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=ru&APPID=${APP_ID}&q=`;
const defaultCity = 'izhevsk';
const defaultCoords = '56,53';
let coords;
const indexPage = {
    init() {
        this.getWeatherInfoForCurrentPage(defaultCity, defaultCoords);
        const searchField = document.getElementById('search-field');
        searchField.addEventListener('change', (event) => {
            const city = event.target.value;
            this.getWeatherInfoForCurrentPage(city, coords);
        });
    },

    getWeatherInfoForCurrentPage(city, coords) {
        this.getWeatherDetails(city, this.renderWeatherDetails);
        this.getAirPollution(coords, this.renderAirPollution);
        this.getFiveDaysWeather(city, this.renderWeatherForecast, this.renderGrahps);
    },

    getWeatherDetails(city, callback) {
        const url = `${WEATHER_DETAILS_ENDPOINT}${city}`;
        getDataFromApi(url, callback);
    },

    getAirPollution(coords, callback) {
        const url = `${AIR_POLLUTION_ENDPOINT[0]}${coords}${AIR_POLLUTION_ENDPOINT[1]}`;
        getDataFromApi(url, callback);
    },

    getFiveDaysWeather(city, callback1, callback2) {
        url = `${FIVE_DAY_WEATHER_ENDPOINT}${city}`;
        getDataFromApi(url, callback1, callback2);
    },

    renderWeatherDetails(jsonData) {
        coords = `${Math.floor(jsonData.coord.lat)},${Math.floor(jsonData.coord.lon)}`;
        insertElementIntoDom('chosen-location', `${jsonData.name}, ${jsonData.sys.country}`);
        insertElementIntoDom('today-weekday', capitalizeFirstLetter(new Date(jsonData.dt * 1000).toLocaleString('ru-RU', { weekday: 'long' })));
        insertElementIntoDom('weather-description', capitalizeFirstLetter(jsonData.weather[0].description));
        setAttributesForDomElement(document.getElementById('weather-icon'), { src: createIconLink(jsonData.weather[0].icon), alt: jsonData.weather[0].description });
        insertElementIntoDom('current-temperature', `${Math.round(jsonData.main.temp)} °C`);
        insertElementIntoDom('today-humidity', `Влажность: ${jsonData.main.humidity} %`);
        insertElementIntoDom('today-wind-speed', `Ветер: ${jsonData.wind.speed.toFixed(1)} м/с`);
        insertElementIntoDom('today-precipitation', `Осадки: ${getPrecipitationVolume(jsonData)} мм`);
    },

    renderAirPollution(jsonData) {
        const airPollutionObject = jsonData.data.find((airPollutionObject) => {
            return Math.floor(airPollutionObject.pressure) === 215;
        });
        insertElementIntoDom('air-pollution', `Загрязнение воздуха: ${airPollutionObject.value}`);
    },

    renderWeatherForecast(jsonData) {
        const fiveDaysForecastArray = extractFiveDaysForecastData(jsonData);
        let daysForecastHTML = '';
        fiveDaysForecastArray.forEach((day) => {
            daysForecastHTML += createDayForecastHtml(day);
        });
        insertElementIntoDom('week-forecast-container', daysForecastHTML);
    },

    renderGrahps(data) {
        const graphsDataArray = extractGraphsData(data);

        let graphSignaturesHtml = '';
        let tempGraphHtml = '';
        let precipitationGraphHtml = '';
        let windGraphHtml = '';

        graphsDataArray.forEach((graphDataItem) => {
            graphSignaturesHtml += `<section class="item">
                                    <p>${graphDataItem.time}</p>
                                </section>`;
            tempGraphHtml += `<section class="item">
                            <p class="value">${graphDataItem.temp}</p>
                            <p class="column" style="height:${50 / 70 * graphDataItem.temp}px;"></p>
                          </section>`;
            precipitationGraphHtml += `<section class="item">
                                        <p class="value">${graphDataItem.precipitation} мм</p>
                                        <p class="column" style="height:${graphDataItem.precipitation * 10}px"></p>
                                    </section>`;
            windGraphHtml += `<section class="item">
                            <p>${graphDataItem.windSpeed} м/с</p>
                            <img src="assets/${graphDataItem.windDirection}.png" alt="направление ветра">
                        </section>`;
        });
        insertElementIntoDom('graph-signatures-container', graphSignaturesHtml);
        insertElementIntoDom('temperature-graph-container', tempGraphHtml);
        insertElementIntoDom('precipitation-graph-container', precipitationGraphHtml);
        insertElementIntoDom('wind-graph-container', windGraphHtml);
    },
};

indexPage.init();

function extractFiveDaysForecastData(data) {
    const daysForecastArray = [];
    data.list.forEach((weatherObject) => {
        const weatherObjectDayName = new Date(weatherObject.dt * 1000).toLocaleString('ru-RU', { weekday: 'short' });
        const dayIndex = daysForecastArray.findIndex(day => day.dayName === weatherObjectDayName);
        
        if (dayIndex >= 0) {
            const day = daysForecastArray[dayIndex];
            if (day.maxTemp < weatherObject.main.temp) {
                day.maxTemp = Math.round(weatherObject.main.temp);
                day.description = weatherObject.weather[0].description;
                day.icon = createIconLink(weatherObject.weather[0].icon);
            }
            if (day.minTemp > weatherObject.main.temp) {
                day.minTemp = Math.round(weatherObject.main.temp);
            }
        } else {
            daysForecastArray.push({
                dayName: weatherObjectDayName,
                icon: createIconLink(weatherObject.weather[0].icon),
                maxTemp: Math.round(weatherObject.main.temp),
                minTemp: Math.round(weatherObject.main.temp),
                description: weatherObject.weather[0].description,
            });
        }
    });
    return daysForecastArray;
}

function extractGraphsData(data) {
    weatherFor24Hours = data.list.slice(0, 8);
    return weatherFor24Hours.map((element) => ({
        time: new Date(element.dt * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(element.main.temp),
        precipitation: getPrecipitationVolume(element).toFixed(1),
        windSpeed: Math.round(element.wind.speed),
        windDirection: getWindDirection(element.wind.deg),
    }));
}