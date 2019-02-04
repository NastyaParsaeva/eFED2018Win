function createPartDayWeatherHtml(name, weatherData) {
    if (weatherData) {
        return `<section class = "part-day-weather item">
                      <p class="part-day-name">${name}</p>
                      <img src = "${weatherData.iconLink}" alt = "${weatherData.description}">
                      <p class = "temperature normal">${weatherData.temp}</p>
                  </section>`;
    }
    return '';
}

function createPartDayWindHtml(weatherData) {
    if (weatherData) {
        return `<span class = "item">
                      <p><span>${weatherData.windSpeed}</span></p>
                  </span>`;
    }
    return '';
}

function createPartDayPrecipitationHtml(weatherData) {
    if (weatherData) {
        return `<section class = "item">
                      <p class="${weatherData.precipitationLevel}">${weatherData.precipitation}</p>
                  </section>`;
    }
    return '';
}

function createDayWeatherHtml(dayWeather) {
    return `<section class = "day-weather">
                <p class="day-name">${dayWeather.date}</p>
                ${createPartDayWeatherHtml('Ночь', dayWeather.night)}
                ${createPartDayWeatherHtml('Утро', dayWeather.morning)}
                ${createPartDayWeatherHtml('День', dayWeather.day)}
                ${createPartDayWeatherHtml('Вечер', dayWeather.evening)}
            </section>`;
}

function createDayWindHtml(dayWind) {
    return `<section class = "day-wind">
                ${createPartDayWindHtml(dayWind.night)}
                ${createPartDayWindHtml(dayWind.morning)}
                ${createPartDayWindHtml(dayWind.day)}
                ${createPartDayWindHtml(dayWind.evening)}
            </section>`;
}

function createDayPrecipitationHtml(dayPrecip) {
    return `<section class = "day-precepitation">
                ${createPartDayPrecipitationHtml(dayPrecip.night)}
                ${createPartDayPrecipitationHtml(dayPrecip.morning)}
                ${createPartDayPrecipitationHtml(dayPrecip.day)}
                ${createPartDayPrecipitationHtml(dayPrecip.evening)}
            </section>`;
} 

function createDayNamesListHtml(date) {
    return `<li class="menu-link">${date.slice(0, 2)}</li>`;
}
