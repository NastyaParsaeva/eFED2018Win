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
                      <p class=${weatherData.precipitationLevel}>${weatherData.precipitation}</p>
                  </section>`;
    }
    return '';
}

function createDayWeatherHtml(dayWeather) {
    return `<section class = "day-weather slide">
                <p class="day-name">${dayWeather.date}</p>
                <div class="weather-items-container">
                    ${createPartDayWeatherHtml('Ночь', dayWeather.night)}
                    ${createPartDayWeatherHtml('Утро', dayWeather.morning)}
                    ${createPartDayWeatherHtml('День', dayWeather.day)}
                    ${createPartDayWeatherHtml('Вечер', dayWeather.evening)}
                </div>
            </section>`;
}

function createDayWindHtml(dayWind) {
    return `<section class = "day-wind slide">
                ${createPartDayWindHtml(dayWind.night)}
                ${createPartDayWindHtml(dayWind.morning)}
                ${createPartDayWindHtml(dayWind.day)}
                ${createPartDayWindHtml(dayWind.evening)}
            </section>`;
}

function createDayPrecipitationHtml(dayPrecip) {
    return `<section class = "day-precepitation slide">
                ${createPartDayPrecipitationHtml(dayPrecip.night)}
                ${createPartDayPrecipitationHtml(dayPrecip.morning)}
                ${createPartDayPrecipitationHtml(dayPrecip.day)}
                ${createPartDayPrecipitationHtml(dayPrecip.evening)}
            </section>`;
} 

function createDayNamesListHtml(date) {
    return `<li class="menu-link">${date.slice(0, 2)}</li>`;
}

function createFiveDaysMainContentHtml() {
    return  `<figure class="arrow">
                <img id="prev-day" src="assets\left-arrow.png" alt="Предыдущий день"> 
            </figure>
            <section id="weather-container" class="weather-container">
                <section id="five-days-container" class="five-days-container">
                    <section id="daily-weather-container" class="daily-weather-container">
                    </section>
                <nav class="slider-signatures">
                    <ul id = "day-switcher">
                    </ul>
                </nav>
                <p id = "wind-forecast-label" class="additional-weather-parameter">Максимальная скорость ветра, м/с</p>
                <section id = "wind-container" class="wind-container">
                </section>
                <p id = "precepitation-forecast-label" class="additional-weather-parameter">Осадки, мм</p>
                <section id="precepitation-container"class="precepitation-container">
                </section>
            </section>
            <figure id = "next-day-container" class="arrow">
                <img id = "next-day" src="assets\right-arrow.png" alt="Следующий день">
            </figure>`;
}

function fiveDaysAsideContentHtml() {
    return `<section class="moon-calendar-header">
                <p id="today"class="today"></p> 
                <p class="moon-calendar-name"></p>
            </section>  
            <section class="moon-calendar-component-container">
                <section class="moon-calendar-component">
                    <figure>
                        <img src="assets/Sun.png" alt="День" >      
                    </figure>
                    <section class="moon-calendar-description">
                        <p id="day-length"></p>
                        <p id="sunrise"></p>
                        <p id="sunset"></p>
                    </section>
                </section>
            </section>`;
}