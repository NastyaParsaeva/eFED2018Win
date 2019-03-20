class FiveDaysPageRenderer extends Renderer {
    
    renderAsideElement() {
        const aside = document.createElement('aside');
        aside.id = 'aside-content';
        document.body.appendChild(aside);
    }

    renderAsideElementContent(contentHtml) {
        this.insertElementIntoDom('aside-content', contentHtml)
        
    }

    renderSunDetails(sunDetails) {
        Utils.insertElementIntoDom('sunrise', `Восход - ${sunDetails.sunrise}`);
        Utils.insertElementIntoDom('sunset', `Заход - ${sunDetails.sunset}`);
        Utils.insertElementIntoDom('day-length', `Долгота дня - ${sunDetails.hoursDiff} ч ${sunDetails.minutesDiff} мин`);
    }

    renderCurrentParams(currentParams) {
        Utils.insertElementIntoDom('current-location', `${currentParams.temp}° ${currentParams.city}, ${currentParams.country}`);
        Utils.insertElementIntoDom('today', `${currentParams.today}, сегодня`);
        Utils.setAttributesForImage('current-weather-icon', currentParams.weatherIcon, currentParams.weatherDescription);
    }

    renderFiveDaysForecast(dailyWeatherArray) {
        let dayWeatherHtml = '', windHtml = '', precipitationHtml = '', dayNamesListHtml = '';
        dailyWeatherArray.forEach((weather) => {
            dayWeatherHtml += createDayWeatherHtml(weather);
            windHtml += createDayWindHtml(weather);
            precipitationHtml += createDayPrecipitationHtml(weather);
            dayNamesListHtml += createDayNamesListHtml(weather.date);
        });
        Utils.insertElementIntoDom('day-switcher', dayNamesListHtml);
        Utils.insertElementIntoDom('daily-weather-container', dayWeatherHtml);
        Utils.insertElementIntoDom('wind-container', windHtml);
        Utils.insertElementIntoDom('precepitation-container', precipitationHtml);
        Utils.addClassNameForFirstChild('day-switcher', 'selected');
        Utils.addClassNameForFirstChild('daily-weather-container', 'shown');
        Utils.addClassNameForFirstChild('wind-container', 'shown');
        Utils.addClassNameForFirstChild('precepitation-container', 'shown');
    }
}





