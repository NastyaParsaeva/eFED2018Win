class IndexPageRenderer extends Renderer {
    
    renderWeatherDetails(weatherDetails) {
        Utils.insertElementIntoDom('chosen-location', weatherDetails.location);
        Utils.insertElementIntoDom('today-weekday', weatherDetails.weekday);
        Utils.insertElementIntoDom('weather-description', weatherDetails.weatherDescription);
        Utils.setAttributesForImage('weather-icon', weatherDetails.iconLink, weatherDetails.weatherDescription);
        Utils.insertElementIntoDom('current-temperature', weatherDetails.temperature);
        Utils.insertElementIntoDom('today-humidity', weatherDetails.humidity);
        Utils.insertElementIntoDom('today-wind-speed', weatherDetails.windSpeed);
        Utils.insertElementIntoDom('today-precipitation', weatherDetails.precipitation);
    }

    renderAirPollution(airPollutionObject) {
        Utils.insertElementIntoDom('air-pollution', `Загрязнение воздуха: ${airPollutionObject.value}`);
    }

    renderWeatherForecast(fiveDaysForecastArray) {
        let daysForecastHTML = '';
        fiveDaysForecastArray.forEach((day) => {
            daysForecastHTML += createDayForecastHtml(day);
        });
        Utils.insertElementIntoDom('week-forecast-container', daysForecastHTML);
    }

    renderGrahps(graphsDataArray) {
        const maxPrecLevel = Utils.findMaxPrecLevel(graphsDataArray);
        const minTemp = Utils.findMinTemperature(graphsDataArray);
        const tempChartStep = Utils.findTemperatureChartStep(minTemp, graphsDataArray);
        let graphSignaturesHtml = '', tempGraphHtml = '', precipitationGraphHtml = '', windGraphHtml = '';
        graphsDataArray.forEach((graphDataItem) => {
            graphSignaturesHtml += createGraphSignaturesHtml(graphDataItem.time);
            tempGraphHtml += createTempGrapItemHtml(minTemp, tempChartStep, graphDataItem.temp);
            precipitationGraphHtml += createPrecipitationGraphItemHtml(graphDataItem.precipitation, maxPrecLevel);
            windGraphHtml += createWindGraphItemHtml(graphDataItem.windSpeed, graphDataItem.windDirection);
        });
        Utils.insertElementIntoDom('graph-signatures-container', graphSignaturesHtml);
        Utils.insertElementIntoDom('temperature-graph-container', tempGraphHtml);
        Utils.insertElementIntoDom('precipitation-graph-container', precipitationGraphHtml);
        Utils.insertElementIntoDom('wind-graph-container', windGraphHtml);
    }
}
