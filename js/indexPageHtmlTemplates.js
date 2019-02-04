function createDayForecastHtml(day) {
    return `<section class="item">
                <p class="day-name">${day.dayName}</p>
                <img src="${day.icon}" alt="${day.description}">
                <p class="future-temp"><span class="max">${day.maxTemp} °</span> ${day.minTemp} °</p>
            </section>`;
}

function createGraphSignaturesHtml(time) {
    return `<section class="item">
                <p>${time}</p>
            </section>`;
}

function createTempGrapItemhHtml(temp) {
    const columnHeight = 50 / 70 * temp;
    return `<section class="item">
                <p class="value">${temp}</p>
                <p class="column" style="height:${columnHeight}px;"></p>
            </section>`;
}

function createPrecipitationGraphItemHtml(precipitation) {
    const columnHeight = precipitation * 10;
    return `<section class="item">
                <p class="value">${precipitation} мм</p>
                <p class="column" style="height:${columnHeight}px"></p>
            </section>`;
}

function createWindGraphItemHtml(windSpeed, windDirection) {
    return `<section class="item">
                <p>${windSpeed} м/с</p>
                <img src="assets/${windDirection}.png" alt="направление ветра">
            </section>`;
}