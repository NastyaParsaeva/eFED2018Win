/* eslint no-undef: 0 */

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
}

function extractForcastParameters(list) {
    const daylyWeatherArray = [];
    for (let i = 0; i < list.length; i += 2) {
        const dayPartWeather = createDayPartWeather(list[i]);
        const dayPartName = definePartOfDay(list[i].dt);        
        const date = capitalizeFirstLetter(new Date(list[i].dt * 1000)
            .toLocaleString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' }));
        const dayIndex = daylyWeatherArray.findIndex(dayWeather => dayWeather.date === date);

        if (dayIndex >= 0) {
            daylyWeatherArray[dayIndex][dayPartName] = dayPartWeather;
        } else {            
            daylyWeatherArray.push({
                date,
                [dayPartName]: dayPartWeather,
            });
        }
    }
    return daylyWeatherArray;
}

function extractSunDetails(data) {
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

function extractCurrentParams(data) {
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

const page = {

    defaultCity: 'izhevsk',

    init() {
        this.loadContent(this.defaultCity);
        const searchField = document.getElementById('search-field');
        slider.initializeArrowEventListeners();
        searchField.addEventListener('change', (event) => {
            const city = event.target.value;
            this.loadContent(city);
        });
        hideSpinner();
    },

    loadContent(city) {
        showSpinner();
        this.getWeatherInfoForCurrentPage(city);
        hideSpinner();
    },

    getWeatherInfoForCurrentPage(city) {
        this.getFiveDaysForecast(city, this.renderFiveDaysForecast);
        this.getWeatherDetails(city, this.renderSunDetails, this.renderCurrentParams);
    },

    getFiveDaysForecast(city, callback) {
        const url = `${FIVE_DAY_WEATHER_ENDPOINT}${city}`;
        getDataFromApi(url, callback);
    },

    getWeatherDetails(city, callback1, callback2) {
        const url = `${WEATHER_DETAILS_ENDPOINT}${city}`;
        getDataFromApi(url, callback1, callback2);
    },

    renderSunDetails(data) {
        const sunDetails = extractSunDetails(data);
        insertElementIntoDom('sunrise', `Восход - ${sunDetails.sunrise}`);
        insertElementIntoDom('sunset', `Заход - ${sunDetails.sunset}`);
        insertElementIntoDom('day-length', `Долгота дня - ${sunDetails.hoursDiff} ч ${sunDetails.minutesDiff} мин`);
    },

    renderCurrentParams(data) {
        const currentParams = extractCurrentParams(data);
        insertElementIntoDom('current-location', `${currentParams.temp}° ${currentParams.city}, ${currentParams.country}`);
        insertElementIntoDom('today', `${currentParams.today}, сегодня`);
        setAttributesForImage('current-weather-icon', currentParams.weatherIcon, currentParams.weatherDescription);
    },

    renderFiveDaysForecast(data) {
        const dailyWeatherArray = extractForcastParameters(data.list);
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

        // document.getElementById('daily-weather-container').firstChild.classList.add('shown');
        addClassNameForFirstChild('daily-weather-container', 'shown');
        addClassNameForFirstChild('wind-container', 'shown');
        addClassNameForFirstChild('precepitation-container', 'shown');
        addClassNameForFirstChild('day-switcher', 'selected');
        // document.getElementById('day-switcher').firstChild.classList.add('selected');

        slider.initializeSlider();
    },
};

page.init();
