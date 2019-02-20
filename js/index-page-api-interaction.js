
const indexPage = {
    defaultCity: 'izhevsk',
    defaultCoords: '56,53',
    coords: '',
    init() {
        this.loadContent(this.defaultCity, this.defaultCoords);
        slider.initSlider();
        const searchField = document.getElementById('search-field');
        searchField.addEventListener('change', (event) => {
            const city = event.target.value;
            this.loadContent(city, coords);
        });
    },

    loadContent(city, coords) {
        showSpinner();
        this.getWeatherInfoForCurrentPage(city, coords);
        hideSpinner();
    },

    getWeatherInfoForCurrentPage(city, coords) {
        this.getWeatherDetails(city, this.renderWeatherDetails);
        this.getAirPollution(coords, this.renderAirPollution);
        this.getFiveDaysWeather(city, this.renderWeatherForecast, this.renderGrahps);
    },

    getWeatherDetails(city, callback) {
        const url = `${WEATHER_DETAILS_ENDPOINT}${city}`;
        // getDataFromApi(url, callback);
        getDataFromApiThroughFetch(url, callback);
    },

    getAirPollution(coords, callback) {
        const url = `${AIR_POLLUTION_ENDPOINT[0]}${coords}${AIR_POLLUTION_ENDPOINT[1]}`;
        // getDataFromApi(url, callback);
        getDataFromApiThroughFetch(url, callback);
    },

    getFiveDaysWeather(city, callback1, callback2) {
        url = `${FIVE_DAY_WEATHER_ENDPOINT}${city}`;
        // getDataFromApi(url, callback1, callback2);
        getDataFromApiThroughFetch(url, callback1, callback2);
    },

    renderWeatherDetails(jsonData) {
        coords = `${Math.floor(jsonData.coord.lat)},${Math.floor(jsonData.coord.lon)}`;
        insertElementIntoDom('chosen-location', `${jsonData.name}, ${jsonData.sys.country}`);
        insertElementIntoDom('today-weekday', capitalizeFirstLetter(new Date(jsonData.dt * 1000).toLocaleString('ru-RU', { weekday: 'long' })));
        insertElementIntoDom('weather-description', capitalizeFirstLetter(jsonData.weather[0].description));
        setAttributesForImage('weather-icon', createIconLink(jsonData.weather[0].icon), jsonData.weather[0].description);
        insertElementIntoDom('current-temperature', `${Math.round(jsonData.main.temp)}°C`);
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

        const maxPrecLevel = findMaxPrecipitationLevelBiggerThan5(graphsDataArray);
        const minTemp = findMinTemperature(graphsDataArray);
        const tempChartStep = findTemperatureChartStep(minTemp, graphsDataArray);
        
        let graphSignaturesHtml = '',
            tempGraphHtml = '',
            precipitationGraphHtml = '',
            windGraphHtml = '';

        graphsDataArray.forEach((graphDataItem) => {
            graphSignaturesHtml += createGraphSignaturesHtml(graphDataItem.time);
            tempGraphHtml += createTempGrapItemHtml(minTemp, tempChartStep, graphDataItem.temp);
            precipitationGraphHtml += createPrecipitationGraphItemHtml(graphDataItem.precipitation, maxPrecLevel);
            windGraphHtml += createWindGraphItemHtml(graphDataItem.windSpeed, graphDataItem.windDirection);
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
    const weatherFor24Hours = data.list.slice(0, 8);
    return weatherFor24Hours.map((element) => ({
        time: new Date(element.dt * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(element.main.temp),
        precipitation: getPrecipitationVolume(element).toFixed(1),
        windSpeed: Math.round(element.wind.speed),
        windDirection: getWindDirection(element.wind.deg),
    }));
}

function findMinTemperature(data) {
    return data.reduce((min, value) => {
        return Math.min(min, value.temp);
    }, data[0].temp);
}

function findTemperatureChartStep(min, data) {
    const max = findMaxTemperature(data);
    return Math.floor(50 / (max - min));
}

function findMaxTemperature(data) {
    return data.reduce((max, value) => {
        return Math.max(max, value.temp);
    }, data[0].temp);
}