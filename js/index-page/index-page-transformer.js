class IndexPageTransformer extends Transformer {
   
    extractFiveDaysForecastData(data) {
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
            }
            else {
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
    
    extractGraphsData(data) {
        const weatherFor24Hours = data.list.slice(0, 8);
        return weatherFor24Hours.map((element) => ({
            time: new Date(element.dt * 1000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
            temp: Math.round(element.main.temp),
            precipitation: getPrecipitationVolume(element).toFixed(1),
            windSpeed: Math.round(element.wind.speed),
            windDirection: getWindDirection(element.wind.deg),
        }));
    }

    extractWeatherDetails(jsonData) {
        return {
            location: `${jsonData.name}, ${jsonData.sys.country}`,
            weekday: capitalizeFirstLetter(new Date(jsonData.dt * 1000).toLocaleString('ru-RU', { weekday: 'long' })),
            weatherDescription: capitalizeFirstLetter(jsonData.weather[0].description),
            iconLink: createIconLink(jsonData.weather[0].icon),
            temperature: `${Math.round(jsonData.main.temp)}°C`,
            humidity: `Влажность: ${jsonData.main.humidity} %`,
            windSpeed: `Ветер: ${jsonData.wind.speed.toFixed(1)} м/с`,
            precipitation: `Осадки: ${getPrecipitationVolume(jsonData)} мм`
        };
    }

    extractCityCoords(jsonData) {
        return `${Math.floor(jsonData.coord.lat)},${Math.floor(jsonData.coord.lon)}`;
    }

    extractAirPollution(jsonData) {
        return jsonData.data.find((airPollutionObject) => {
            return Math.floor(airPollutionObject.pressure) === 215;
        });
    }
}
