function IndexPageTransformer() {
}

IndexPageTransformer.prototype = Object.create(Transformer.prototype);

IndexPageTransformer.prototype.extractFiveDaysForecastData = function(data) {
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
};

IndexPageTransformer.prototype.extractGraphsData = function(data) {
    const weatherFor24Hours = data.list.slice(0, 8);
    return weatherFor24Hours.map((element) => ({
        time: new Date(element.dt * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(element.main.temp),
        precipitation: getPrecipitationVolume(element).toFixed(1),
        windSpeed: Math.round(element.wind.speed),
        windDirection: getWindDirection(element.wind.deg),
    }));
};