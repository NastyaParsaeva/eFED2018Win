function FiveDaysPageRenderer() {}

FiveDaysPageRenderer.prototype = Object.create(Renderer.prototype);


FiveDaysPageRenderer.prototype.renderAsideElement = function() {
    const aside = document.createElement('aside');
    aside.innerHTML = fiveDaysAsideContentHtml();
    document.body.appendChild(aside);
};

FiveDaysPageRenderer.prototype.renderSunDetails = function(data, transformFunction) {
    const sunDetails = transformFunction(data);
    insertElementIntoDom('sunrise', `Восход - ${sunDetails.sunrise}`);
    insertElementIntoDom('sunset', `Заход - ${sunDetails.sunset}`);
    insertElementIntoDom('day-length', `Долгота дня - ${sunDetails.hoursDiff} ч ${sunDetails.minutesDiff} мин`);
};

FiveDaysPageRenderer.prototype.renderCurrentParams = function(data, transformFunction) {
    const currentParams = transformFunction(data);
    insertElementIntoDom('current-location', `${currentParams.temp}° ${currentParams.city}, ${currentParams.country}`);
    insertElementIntoDom('today', `${currentParams.today}, сегодня`);
    setAttributesForImage('current-weather-icon', currentParams.weatherIcon, currentParams.weatherDescription);
};

FiveDaysPageRenderer.prototype.renderFiveDaysForecast = function(data, transformFunction) {
    const dailyWeatherArray = transformFunction(data.list);
    let dayWeatherHtml = '',
        windHtml = '',
        precipitationHtml = '',
        dayNamesListHtml = '';

    dailyWeatherArray.forEach((weather) => {
        dayWeatherHtml += createDayWeatherHtml(weather);
        windHtml += createDayWindHtml(weather);
        precipitationHtml += createDayPrecipitationHtml(weather);
        dayNamesListHtml += createDayNamesListHtml(weather.date);
    });
    insertElementIntoDom('daily-weather-container', dayWeatherHtml);
    insertElementIntoDom('wind-container', windHtml);
    insertElementIntoDom('precepitation-container', precipitationHtml);
    insertElementIntoDom('day-switcher', dayNamesListHtml);

    addClassNameForFirstChild('daily-weather-container', 'shown');
    addClassNameForFirstChild('wind-container', 'shown');
    addClassNameForFirstChild('precepitation-container', 'shown');
    addClassNameForFirstChild('day-switcher', 'selected');

    slider.initializeSlider();
};