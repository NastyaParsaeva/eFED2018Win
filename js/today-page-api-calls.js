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
        this.getFiveDaysWeather(defaultCity, this.renderWeatherForecast, this.renderGrahps);
        const searchField = document.getElementById('search-field');
        searchField.addEventListener('change', (event) => {
            
            const city = event.target.value;
            this.getWeatherDetails(city, this.renderWeatherDetails);
            this.getAirPollution(coords, this.renderAirPollution);
            this.getFiveDaysWeather(city, this.renderWeatherForecast, this.renderGrahps);
            
        });
    },  

    getData(url, callbacks) {
        const xhr = new XMLHttpRequest();
        console.log(callbacks);
        xhr.onload = function() {
            if (this.readyState === 4 && this.status === 200) {
                let response = JSON.parse(xhr.responseText);
                callbacks.forEach(callback => {
                    callback(response);
                })
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    },

    getWeatherDetails(city, ...callbacks) {
        const url = `${ WEATHER_DETAILS_ENDPOINT }${ city }`;
        this.getData(url, callbacks);
    },
    
    getAirPollution(coords, ...callbacks) {
        const url = `${ AIR_POLLUTION_ENDPOINT[0] }${ coords }${ AIR_POLLUTION_ENDPOINT[1] }`;
        this.getData(url, callbacks);
    },

    getFiveDaysWeather(city, ...callbacks) {
        url = `${FIVE_DAY_WEATHER_ENDPOINT }${ city }`;
        this.getData(url, callbacks);
    },

    renderWeatherDetails(data) {
        coords = `${ Math.floor(data.coord.lat) },${ Math.floor(data.coord.lon) }`;
        insertElement('chosen-location', `${data.name}, ${data.sys.country}`);
        insertElement('today-weekday', new Date(data.dt * 1000).toLocaleString('ru-RU', {weekday: "long"}));
        insertElement('weather-description', data.weather[0].description);
        setAttributes(document.getElementById('weather-icon'), {'src' : `http://openweathermap.org/img/w/${data.weather[0].icon}.png`, 'alt' : data.weather[0].description});
        insertElement('current-temperature', `${Math.round(data.main.temp)} °C`);
        insertElement('today-humidity', `Влажность: ${data.main.humidity} %`);
        insertElement('today-wind-speed', `Ветер: ${data.wind.speed.toFixed(1)} м/с`);
        insertElement('today-precipitation', `Осадки: ${getPrecipitationVolume(data)} мм`);
        // DOM manipulation 
    },

    renderAirPollution(data) {
        let element = data.data.find((element) => {
            if (Math.floor(element.pressure) === 215) {
                return element;    
            }
        });
        insertElement('air-pollution', `Загрязнение воздуха: ${element.value}`);
    },

    renderWeatherForecast(data) {
        console.log(data);
        let daysArray = extractFiveDaysForecastData(data);
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
    },

    renderGrahps(data) {
        let graphsDataArray = extractGraphsData(data);

        let graphSignatures = '';
        let tempGraph = '';
        let precipitationGraph = '';
        let windGraph = '';
        
        graphsDataArray.forEach(element => {
            graphSignatures += `<section class="item">
                                    <p>${element.time}</p>
                                </section>`;
            tempGraph += `<p class="item">${element.temp}</p>`;
            precipitationGraph += `<p class="item">&nbsp;</p>
                                <p class="item">${element.precipitation}%</p>
                                    <p class="item">&nbsp;</p>`;
            windGraph += `<section class="item">
                            <p>${element.windSpeed} м/с</p>
                            <img src="assets/${element.windDirection}.png" alt="направление ветра">
                        </section>`
        });
        insertElement('graph-signatures-container', graphSignatures);
        insertElement('temperature-graph-container', tempGraph);
        insertElement('precipitation-graph-container', precipitationGraph);
        insertElement('wind-graph-container', windGraph);

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

function extractFiveDaysForecastData(data) {
    let daysArray = [];

    data.list.forEach(element => {
        let elementDayName = new Date(element.dt * 1000).toLocaleString('ru-RU', {weekday: "short"});
        if (!daysArray.find(day => {
            if (day.dayName === elementDayName) {
                if (day.maxTemp < element.main.temp) {
                    day.maxTemp = Math.round(element.main.temp);
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
    return daysArray;
}

function extractGraphsData(data) {
    let graphsItems = [];
    data = data.list.slice(0, 8);
    console.log(data);
    data.forEach(element => {        
        
        let newGraphItem = {};
        newGraphItem.time = new Date(element.dt * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        newGraphItem.temp = Math.round(element.main.temp);
        newGraphItem.precipitation = Math.round(getPrecipitationVolume(element) * 100);
        newGraphItem.windSpeed = Math.round(element.wind.speed);
        newGraphItem.windDirection = getWindDirection(element.wind.deg);
        graphsItems.push(newGraphItem);
    })
    console.log(graphsItems);
    return graphsItems;
}

function getPrecipitationVolume(data) {
    if (data.rain) {
        if (data.rain['1h']) {
            return data.rain['1h'];
        }
        if (data.rain['3h']) {
            return data.rain['3h'];
        }
    } else {
        if (data.snow) {
            if (data.snow['1h']) {
                return data.snow['1h'];
            }
            if (data.snow['3h']) {
                return data.snow['3h'];
            }
        } 
    }
    return 0;
}

function getWindDirection(degree) {
    if (degree <= 23 || degree > 338) {
        return 'north';
    } else if (degree > 23 && degree <= 68) {
        return 'northeast';
    } else if (degree > 68 && degree <= 113) {
        return 'east';
    } else if (degree > 113 && degree <= 158) {
        return 'southeast';
    } else if (degree > 158 && degree <= 203) {
        return 'south';
    } else if (degree > 203 && degree <= 248) {
        return 'southwest';
    } else if (degree > 248 && degree <= 293) {
        return 'west';
    } else if (degree > 293 && degree <= 338) {
        return 'northwest';
    } 
}