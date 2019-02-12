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

function createTempGrapItemhHtml(temp) {
    const columnHeight = 50 / 70 * temp;
    return `<section class="item">
                <p class="value">${temp}</p>
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