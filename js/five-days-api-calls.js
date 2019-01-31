const APP_ID = 'cbb3210df49fdf1c3c675a785e42454b';
const FIVE_DAY_WEATHER_ENDPOINT = `http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=ru&APPID=${ APP_ID }&q=`;
const WEATHER_DETAILS_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&APPID=${ APP_ID }&q=`;
const defaultCity = 'izhevsk';

const page = {
    init: function() {
        this.getWeatherInfoForCurrentPage(defaultCity);
        const searchField = document.getElementById('search-field');
        slider.initializeArrowEventListeners();
        searchField.addEventListener('change', (event) => {
            const city = event.target.value;
            this.getWeatherInfoForCurrentPage(city);
        });
    },

    getWeatherInfoForCurrentPage(city) {
        this.getFiveDaysForecast(city, this.renderFiveDaysForecast);
        this.getWeatherDetails(city, this.renderSunDetails, this.renderCurrentParams);
    },

    getFiveDaysForecast(city, callback) {
        const url = `${ FIVE_DAY_WEATHER_ENDPOINT }${ city }`;
        getDataFromApi(url, callback);
    },

    getWeatherDetails(city, callback1, callback2) {
        const url = `${ WEATHER_DETAILS_ENDPOINT }${ city }`;
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
        setAttributesForDomElement(document.getElementById('current-weather-icon'), {'src' : `${currentParams.weatherIcon}`, 'alt' : currentParams.weatherDescription});
    },

    renderFiveDaysForecast(data) {        
        const dailyWeatherArray = extractForcastParameters(data.list);
        let dayWeatherHtml = '';
        let windHtml = '';
        let precipitationHtml = '';
        let dayNamesListHtml = '';

        dailyWeatherArray.forEach(weather => {
            dayWeatherHtml += `<section class = "day-weather">
                                <p class="day-name">${weather.date}</p>
                                ${createPartDayWeatherHtml('Ночь', weather.night)}
                                ${createPartDayWeatherHtml('Утро', weather.morning)}
                                ${createPartDayWeatherHtml('День', weather.day)}
                                ${createPartDayWeatherHtml('Вечер', weather.evening)}
                            </section>`
            windHtml += `<section class = "day-wind">
                        ${createPartDayWindHtml(weather.night)}
                        ${createPartDayWindHtml(weather.morning)}
                        ${createPartDayWindHtml(weather.day)}
                        ${createPartDayWindHtml(weather.evening)}
                    </section>`;
            precipitationHtml += `<section class = "day-precepitation">
                                ${createPartDayPrecipitationHtml(weather.night)}
                                ${createPartDayPrecipitationHtml(weather.morning)}
                                ${createPartDayPrecipitationHtml(weather.day)}
                                ${createPartDayPrecipitationHtml(weather.evening)}
                            </section>`;  
            dayNamesListHtml += `<li class="menu-link">${weather.date.slice(0, 2)}</li>`;
        })
        insertElementIntoDom('daily-weather-container', dayWeatherHtml);
        insertElementIntoDom('wind-container', windHtml);
        insertElementIntoDom('precepitation-container', precipitationHtml);
        insertElementIntoDom('day-switcher', dayNamesListHtml);

        document.getElementById('daily-weather-container').firstChild.classList.add('shown');
        document.getElementById('day-switcher').firstChild.classList.add('selected');
        
        slider.reinitializeSlider();
    },


};

page.init();

function extractForcastParameters(list) {
    let daylyWeatherArray = [];

    for (let i = 0; i < list.length; i += 2) {
        let dayPartWeather = {};

        dayPartName = definePartOfDay(new Date(list[i].dt * 1000).getHours());
        dayPartWeather.iconLink = `http://openweathermap.org/img/w/${list[i].weather[0].icon}.png`;
        dayPartWeather.temp = Math.round(list[i].main.temp);
        dayPartWeather.windSpeed = Math.round(list[i].wind.speed);
        dayPartWeather.precipitation = getPrecipitationVolume(list[i]).toFixed(1);
        dayPartWeather.description = list[i].weather[0].description;

        const date = new Date(list[i].dt * 1000).toLocaleString('ru-RU', {weekday: 'short', day:'numeric', month: 'short'});

        if (!daylyWeatherArray.find(dayWeather => {
            if (dayWeather.date === date) {
                dayWeather[dayPartName] = dayPartWeather;
                return dayWeather;
            }
        })) {
            let newForecastItem = {};
            newForecastItem.date = new Date(list[i].dt * 1000).toLocaleString('ru-RU', {weekday: 'short', day:'numeric', month: 'short'});
            newForecastItem[dayPartName] = dayPartWeather;
            daylyWeatherArray.push(newForecastItem);
        }
    }
    return daylyWeatherArray;
}

function extractSunDetails(data) {
    sunDetails = {};
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    
    sunDetails.sunrise = sunrise.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    sunDetails.sunset = sunset.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    sunDetails.hoursDiff = Math.floor((sunset - sunrise) / (60 * 60 * 1000));;
    sunDetails.minutesDiff = Math.floor((sunset - sunrise) / (60 * 1000) - sunDetails.hoursDiff * 60);

    return sunDetails;
}

function extractCurrentParams(data) {
    const currentParams = {};
    currentParams.today = new Date(data.dt * 1000).toLocaleString('ru-RU', {weekday: 'long', day:'numeric', month: 'long'});
    currentParams.city = data.name;
    currentParams.country = data.sys.country;
    currentParams.temp = Math.round(data.main.temp);
    currentParams.weatherIcon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    currentParams.weatherDescription = data.weather[0].description;

    return currentParams;
}

function createPartDayWeatherHtml(name, weatherData) {
    if (weatherData) {
        return `<section class = "part-day-weather item">
                    <p class="part-day-name">${name}</p>
                    <img src = "${weatherData.iconLink}" alt = "${weatherData.description}">
                    <p class = "temperature normal">${weatherData.temp}</p>
                </section>`
    }
    return '';
}

function createPartDayWindHtml(weatherData) {
    if (weatherData) {
        return `<span class = "item">
                    <p><span>${weatherData.windSpeed}</span></p>
                </span>`
    }
    return '';
}

function createPartDayPrecipitationHtml(weatherData) {
    if (weatherData) {
        return `<section class = "item">
                    <p class="${getPrecipitationLevel(weatherData.precipitation)}">${weatherData.precipitation}</p>
                </section>`
    }
    return '';
}
