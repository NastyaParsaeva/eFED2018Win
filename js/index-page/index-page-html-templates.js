function createDayForecastHtml(day) {
    return `<section class="item">
                <p class="day-name">${day.dayName}</p>
                <figure>
                    <img src="${day.icon}" alt="${day.description}">
                </figure>
                <p class="future-temp"><span class="max">${day.maxTemp} °</span> ${day.minTemp} °</p>
            </section>`;
}

function createGraphSignaturesHtml(time) {
    return `<section class="item">
                <p>${time}</p>
            </section>`;
}

function createTempGrapItemHtml(minTemp, tempChartStep, tempValue) {
    
    const columnHeight = Math.abs((tempValue - minTemp)) * tempChartStep + 10;
    return `<section class="item">
                <p class="value">${tempValue}</p>
                <p class="column" style="height:${columnHeight}px;"></p>
            </section>`;
}

function createPrecipitationGraphItemHtml(precipitation, maxPrec = 5) {
    const columnHeight = Math.round(precipitation * 100 / maxPrec);
    return `<section class="item">
                <p class="value">${precipitation} мм</p>
                <p class="column" style="height:${columnHeight}%"></p>
            </section>`;
}

function createWindGraphItemHtml(windSpeed, windDirection) {
    return `<section class="item">
                <p>${windSpeed} м/с</p>
                <figure>
                    <img src="assets/${windDirection}.png" alt="направление ветра">
                </figure>
            </section>`;
}

function createCityNotFoundErrorMessage(query) {
    return `Город ${query} не найден. Попробуйте изменить запрос.`;
}

function createMainContentHtml() {
    return `<article class="today-weather-info-container">
                <section class="weather-info">
                    <p id="chosen-location"></p>
                    <p id="today-weekday"></p>
                    <p id="weather-description"></p>
                    <secion class="weather-abbreviation">
                        <figure>
                            <img id = "weather-icon">
                        </figure>
                        <p id="current-temperature"></p>
                    </section>
                    
                </section>
                <section class="weather-info">
                    <p id="today-precipitation"></p>
                    <p id="today-humidity"></p>
                    <p id="today-wind-speed"></p>
                    <nav class="graph-controller">
                        <ul>
                            <li class="menu-link selected">Температура</li>
                            <li class="menu-link">Осадки</li>
                            <li class="menu-link">Ветер</li>
                        </ul>
                    </nav>
                </section>
            </article>

            <div class="graph-container">
                <article id="temperature-graph-container" class="temperature graph shown">
                </article>
                <article id="precipitation-graph-container" class="precipitation graph">
                </article>
                <article id="wind-graph-container" class="wind graph">
                </article>
                <article id="graph-signatures-container" class="graph-signatures">
                </article>
            </div>
            <article id = "week-forecast-container" class="week-forecast">
            </article>`;
}

function createUniqueInfoForSearchRowContent() {
    return '<span id="air-pollution" class="current-location"></span>';
};