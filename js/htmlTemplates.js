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

function createDayForecastHtml(day) {
    return `<section class="item">
                <p class="day-name">${day.dayName}</p>
                <img src="${day.icon}" alt="${day.description}">
                <p class="future-temp"><span class="max">${day.maxTemp} °</span> ${day.minTemp} °</p>
            </section>`;
}

function createGraphSignatureHtml(graphDataItem) {
    return `<section class="item">
                <p>${graphDataItem.time}</p>
            </section>`;
}