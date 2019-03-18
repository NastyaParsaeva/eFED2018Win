class FiveDaysPageTransformer extends Transformer {

    extractForcastParameters(data) {
        const list = data.list;
        const daylyWeatherArray = [];
        for (let i = 0; i < list.length; i += 2) {
            const dayPartWeather = createDayPartWeather(list[i]);
            const dayPartName = definePartOfDay(list[i].dt);
            const date = capitalizeFirstLetter(new Date(list[i].dt * 1000)
                .toLocaleString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' }));
            const dayIndex = daylyWeatherArray.findIndex(dayWeather => dayWeather.date === date);
            if (dayIndex >= 0) {
                daylyWeatherArray[dayIndex][dayPartName] = dayPartWeather;
            }
            else {
                daylyWeatherArray.push({
                    date,
                    [dayPartName]: dayPartWeather,
                });
            }
        }
        return daylyWeatherArray;
    }
    extractSunDetails(data) {
        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);
        const hoursDiff = Math.floor((sunset - sunrise) / (60 * 60 * 1000));
        const options = { hour: '2-digit', minute: '2-digit' };
        return {
            sunrise: sunrise.toLocaleTimeString([], options),
            sunset: sunset.toLocaleTimeString([], options),
            hoursDiff,
            minutesDiff: Math.floor((sunset - sunrise) / (60 * 1000) - hoursDiff * 60),
        };
    }
    extractCurrentParams(data) {
        return {
            today: capitalizeFirstLetter(new Date(data.dt * 1000).
                toLocaleString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })),
            city: data.name,
            country: data.sys.country,
            temp: Math.round(data.main.temp),
            weatherIcon: createIconLink(data.weather[0].icon),
            weatherDescription: data.weather[0].description,
        };
    }
}

function createDayPartWeather(weather) {
    const precipitation = getPrecipitationVolume(weather).toFixed(1);
    return {
        iconLink: createIconLink(weather.weather[0].icon),
        temp: Math.round(weather.main.temp),
        windSpeed: Math.round(weather.wind.speed),
        precipitation,
        precipitationLevel: getPrecipitationLevel(precipitation),
        description: weather.weather[0].description,
    };
};