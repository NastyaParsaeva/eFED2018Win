class FiveDaysPageRenderer extends Renderer {
    
    renderAsideElement() {
        const aside = document.createElement('aside');
        aside.innerHTML = createFiveDaysAsideContentHtml();
        document.body.appendChild(aside);
    }

    renderSunDetails(sunDetails) {
        insertElementIntoDom('sunrise', `Восход - ${sunDetails.sunrise}`);
        insertElementIntoDom('sunset', `Заход - ${sunDetails.sunset}`);
        insertElementIntoDom('day-length', `Долгота дня - ${sunDetails.hoursDiff} ч ${sunDetails.minutesDiff} мин`);
    }

    renderCurrentParams(currentParams) {
        insertElementIntoDom('current-location', `${currentParams.temp}° ${currentParams.city}, ${currentParams.country}`);
        insertElementIntoDom('today', `${currentParams.today}, сегодня`);
        setAttributesForImage('current-weather-icon', currentParams.weatherIcon, currentParams.weatherDescription);
    }

    renderFiveDaysForecast(dailyWeatherArray) {
        let dayWeatherHtml = '', windHtml = '', precipitationHtml = '', dayNamesListHtml = '';
        dailyWeatherArray.forEach((weather) => {
            dayWeatherHtml += createDayWeatherHtml(weather);
            windHtml += createDayWindHtml(weather);
            precipitationHtml += createDayPrecipitationHtml(weather);
            dayNamesListHtml += createDayNamesListHtml(weather.date);
        });
        insertElementIntoDom('day-switcher', dayNamesListHtml);
        insertElementIntoDom('daily-weather-container', dayWeatherHtml);
        insertElementIntoDom('wind-container', windHtml);
        insertElementIntoDom('precepitation-container', precipitationHtml);
        addClassNameForFirstChild('day-switcher', 'selected');
        addClassNameForFirstChild('daily-weather-container', 'shown');
        addClassNameForFirstChild('wind-container', 'shown');
        addClassNameForFirstChild('precepitation-container', 'shown');
    }
}





