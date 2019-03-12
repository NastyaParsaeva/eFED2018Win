class IndexPageRenderer extends Renderer {
    
    renderWeatherDetails(jsonData) {
        insertElementIntoDom('chosen-location', `${jsonData.name}, ${jsonData.sys.country}`);
        insertElementIntoDom('today-weekday', capitalizeFirstLetter(new Date(jsonData.dt * 1000).toLocaleString('ru-RU', { weekday: 'long' })));
        insertElementIntoDom('weather-description', capitalizeFirstLetter(jsonData.weather[0].description));
        setAttributesForImage('weather-icon', createIconLink(jsonData.weather[0].icon), jsonData.weather[0].description);
        insertElementIntoDom('current-temperature', `${Math.round(jsonData.main.temp)}°C`);
        insertElementIntoDom('today-humidity', `Влажность: ${jsonData.main.humidity} %`);
        insertElementIntoDom('today-wind-speed', `Ветер: ${jsonData.wind.speed.toFixed(1)} м/с`);
        insertElementIntoDom('today-precipitation', `Осадки: ${getPrecipitationVolume(jsonData)} мм`);
    }

    renderAirPollution(jsonData) {
        const airPollutionObject = jsonData.data.find((airPollutionObject) => {
            return Math.floor(airPollutionObject.pressure) === 215;
        });
        insertElementIntoDom('air-pollution', `Загрязнение воздуха: ${airPollutionObject.value}`);
    }

    renderWeatherForecast(jsonData, transformFunction) {
        const fiveDaysForecastArray = transformFunction(jsonData);
        let daysForecastHTML = '';
        fiveDaysForecastArray.forEach((day) => {
            daysForecastHTML += createDayForecastHtml(day);
        });
        insertElementIntoDom('week-forecast-container', daysForecastHTML);
    }

    renderGrahps(data, transformFunction) {
        const graphsDataArray = transformFunction(data);
        const maxPrecLevel = findMaxPrecLevel(graphsDataArray);
        const minTemp = findMinTemperature(graphsDataArray);
        const tempChartStep = findTemperatureChartStep(minTemp, graphsDataArray);
        let graphSignaturesHtml = '', tempGraphHtml = '', precipitationGraphHtml = '', windGraphHtml = '';
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
    }
}
