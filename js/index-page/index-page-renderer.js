class IndexPageRenderer extends Renderer {
    
    renderWeatherDetails(weatherDetails) {
        insertElementIntoDom('chosen-location', weatherDetails.location);
        insertElementIntoDom('today-weekday', weatherDetails.weekday);
        insertElementIntoDom('weather-description', weatherDetails.weatherDescription);
        setAttributesForImage('weather-icon', weatherDetails.iconLink, weatherDetails.weatherDescription);
        insertElementIntoDom('current-temperature', weatherDetails.temperature);
        insertElementIntoDom('today-humidity', weatherDetails.humidity);
        insertElementIntoDom('today-wind-speed', weatherDetails.windSpeed);
        insertElementIntoDom('today-precipitation', weatherDetails.precipitation);
    }

    renderAirPollution(airPollutionObject) {
        // const airPollutionObject = jsonData.data.find((airPollutionObject) => {
        //     return Math.floor(airPollutionObject.pressure) === 215;
        // });
        insertElementIntoDom('air-pollution', `Загрязнение воздуха: ${airPollutionObject.value}`);
    }

    renderWeatherForecast(fiveDaysForecastArray) {
        let daysForecastHTML = '';
        fiveDaysForecastArray.forEach((day) => {
            daysForecastHTML += createDayForecastHtml(day);
        });
        insertElementIntoDom('week-forecast-container', daysForecastHTML);
    }

    renderGrahps(graphsDataArray) {
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
