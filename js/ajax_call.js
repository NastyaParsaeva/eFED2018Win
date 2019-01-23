const APP_ID = 'f9a8867923bcc86f488c9142432dd2de';
const WEATHER_DETAILS_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&APPID=${ APP_ID }&q=`;
const AIR_POLLUTION_ENDPOINT = [`http://api.openweathermap.org/pollution/v1/co/`, `/current.json?appid=${ APP_ID}`];
const FIVE_DAY_WEATHER_ENDPOINT = `http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=ru&APPID=${ APP_ID }&q=`;
const defaultCity = 'izhevsk';
let defaultCoords = `56,53`;
let coords;
const page = {
    init: function() {
        this.getWeatherDetails(defaultCity, this.renderWeatherDetails);
        this.getAirPollution(defaultCoords, this.renderAirPollution);
        this.getFiveDaysWeather(defaultCity, this.renderWeatherForecast);
        const searchField = document.getElementById('search-field');
        searchField.addEventListener('change', (event) => {
            
            const city = event.target.value;
            this.getWeatherDetails(city, this.renderWeatherDetails);
            this.getAirPollution(coords, this.renderAirPollution);
            this.getFiveDaysWeather(city, this.renderWeatherForecast);
            
        });
    },  

    getData(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (this.readyState === 4 && this.status === 200) {
                callback(JSON.parse(xhr.responseText));
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    },


    getWeatherDetails(city, callback) {
        const url = `${ WEATHER_DETAILS_ENDPOINT }${ city }`;
        this.getData(url, callback);
    },
    
    getAirPollution(coords, callback) {
        const url = `${ AIR_POLLUTION_ENDPOINT[0] }${ coords }${ AIR_POLLUTION_ENDPOINT[1] }`;
        this.getData(url, callback);
    },

    getFiveDaysWeather(city, callback) {
        url = `${FIVE_DAY_WEATHER_ENDPOINT }${ city }`;
        this.getData(url, callback);
    },

    renderWeatherDetails(data) {
        const { weather:{ temp } } = data;
        coords = `${ Math.floor(data.coord.lat) },${ Math.floor(data.coord.lon) }`;
        insertElement('chosen-location', `${data.name}, ${data.sys.country}`);
        insertElement('today-weekday', new Date(data.dt * 1000).toLocaleString('ru-RU', {weekday: "long"}));
        insertElement('weather-description', data.weather[0].description);
        setAttributes(document.getElementById('weather-icon'), {'src' : `http://openweathermap.org/img/w/${data.weather[0].icon}.png`, 'alt' : data.weather[0].description});
        insertElement('current-temperature', `${Math.round(data.main.temp)} °C`);
        insertElement('today-humidity', `Влажность: ${data.main.humidity} %`);
        insertElement('today-wind-speed', `Ветер: ${data.wind.speed.toFixed(1)} м/с`);

        if (data.rain) {
            data.rain['1h'] ? insertElement('today-precipitation', `Осадки: ${data.rain['1h']} мм`) :
                                insertElement('today-precipitation', `Осадки: ${data.rain['3h']} мм`);
        } else {
            if (data.snow) {
                data.snow['1h'] ? document.getElementById('today-precipitation').innerHTML = `Осадки: ${data.snow['1h']} мм` : 
                                  document.getElementById('today-precipitation').innerHTML = `Осадки: ${data.snow['3h']} мм`;
            } else {
                document.getElementById('today-precipitation').innerHTML = `Осадки: 0 мм`;
            }
        }
        // DOM manipulation 
    },

    renderAirPollution(data) {
        let element = data.data.find((element) => {
            if (Math.floor(element.pressure) === 215) {
                return element;    
            }
        });
        document.getElementById('air-pollution').innerHTML = `Загрязнение воздуха: ${element.value}`;
        console.log(element);
        console.log(data);
    },

    renderWeatherForecast(data) {
        console.log(data);
        let daysArray = getFiveDaysForecastData(data);
        let daysForecastHTMLString = '';
        daysArray.forEach(day => {
            let dayItem = `<section class="item">
                                <p class="day-name">${day.dayName}</p>
                                <img src="http://openweathermap.org/img/w/${day.icon}.png" alt="${day.description}">
                                <p class="future-temp"><span class="max">${day.maxTemp} °</span> ${day.minTemp} °</p>
                                </section>`;
           daysForecastHTMLString += dayItem;
        });
        document.getElementById('week-forecast-container').innerHTML = daysForecastHTMLString;
    }
};

page.init();

function setAttributes(element, attributes) {
    for(var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function insertElement(destinationId, data) {
    document.getElementById(destinationId).innerHTML = data;
}

function getFiveDaysForecastData(data) {
    let daysArray = [];

        data.list.forEach(element => {
            let elementDayName = new Date(element.dt * 1000).toLocaleString('ru-RU', {weekday: "short"});
            if (!daysArray.find(day => {
                if (day.dayName === elementDayName) {
                    if (day.maxTemp < element.main.temp) {
                        day.maxTemp = Math.round(element.main.temp);
                        console.log(day.icon);
                        day.description = element.weather[0].description;
                        day.icon = element.weather[0].icon;
                    }
                    if (day.minTemp > element.main.temp) {
                        day.minTemp = Math.round(element.main.temp);
                    }
                    return day;
                }
            })) 
            {
                let newDay = {};
                newDay.dayName = elementDayName;
                newDay.icon = element.weather[0].icon;
                newDay.maxTemp = Math.round(element.main.temp);
                newDay.minTemp = Math.round(element.main.temp);
                newDay.description = element.weather[0].description;
                daysArray.push(newDay);
            }
        });
        console.log(daysArray);
        return daysArray;
        
}

