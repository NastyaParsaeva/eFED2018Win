function IndexPageRenderer() {}

IndexPageRenderer.prototype = Object.create(Renderer.prototype);

IndexPageRenderer.prototype.renderWeatherDetails = function(jsonData) {
    coords = `${Math.floor(jsonData.coord.lat)},${Math.floor(jsonData.coord.lon)}`;
    this.insertElementIntoDom('chosen-location', `${jsonData.name}, ${jsonData.sys.country}`);
    this.insertElementIntoDom('today-weekday', capitalizeFirstLetter(new Date(jsonData.dt * 1000).toLocaleString('ru-RU', { weekday: 'long' })));
    this.insertElementIntoDom('weather-description', capitalizeFirstLetter(jsonData.weather[0].description));
    this.setAttributesForImage('weather-icon', createIconLink(jsonData.weather[0].icon), jsonData.weather[0].description);
    this.insertElementIntoDom('current-temperature', `${Math.round(jsonData.main.temp)}°C`);
    this.insertElementIntoDom('today-humidity', `Влажность: ${jsonData.main.humidity} %`);
    this.insertElementIntoDom('today-wind-speed', `Ветер: ${jsonData.wind.speed.toFixed(1)} м/с`);
    this.insertElementIntoDom('today-precipitation', `Осадки: ${getPrecipitationVolume(jsonData)} мм`);
};

IndexPageRenderer.prototype.renderAirPollution = function(jsonData) {
    const airPollutionObject = jsonData.data.find((airPollutionObject) => {
        return Math.floor(airPollutionObject.pressure) === 215;
    });
    insertElementIntoDom('air-pollution', `Загрязнение воздуха: ${airPollutionObject.value}`);
};

IndexPageRenderer.prototype.renderWeatherForecast = function(jsonData, transformFunction) {
    const fiveDaysForecastArray = transformFunction(jsonData);
    let daysForecastHTML = '';
    fiveDaysForecastArray.forEach((day) => {
        daysForecastHTML += createDayForecastHtml(day);
    });
    this.insertElementIntoDom('week-forecast-container', daysForecastHTML);
};

IndexPageRenderer.prototype.renderGrahps = function(data, transformFunction) {
    const graphsDataArray = transformFunction(data);

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

    this.insertElementIntoDom('graph-signatures-container', graphSignaturesHtml);
    this.insertElementIntoDom('temperature-graph-container', tempGraphHtml);
    this.insertElementIntoDom('precipitation-graph-container', precipitationGraphHtml);
    this.insertElementIntoDom('wind-graph-container', windGraphHtml);
};