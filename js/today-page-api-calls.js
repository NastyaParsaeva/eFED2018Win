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

    getWeatherDetails(city, ...callbacks) {
        const url = `${ WEATHER_DETAILS_ENDPOINT }${ city }`;
        getDataFromApi(url, callbacks);
    },
    
    getAirPollution(coords, ...callbacks) {
        const url = `${ AIR_POLLUTION_ENDPOINT[0] }${ coords }${ AIR_POLLUTION_ENDPOINT[1] }`;
        getDataFromApi(url, callbacks);
    },

    getFiveDaysWeather(city, ...callbacks) {
        url = `${FIVE_DAY_WEATHER_ENDPOINT }${ city }`;
        getDataFromApi(url, callbacks);
    },

    renderWeatherDetails(data) {
        coords = `${ Math.floor(data.coord.lat) },${ Math.floor(data.coord.lon) }`;
        insertElement('chosen-location', `${data.name}, ${data.sys.country}`);
        insertElement('today-weekday', capitalizeFirstLetter(new Date(data.dt * 1000).toLocaleString('ru-RU', {weekday: "long"})));
        insertElement('weather-description', capitalizeFirstLetter(data.weather[0].description));
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
                                <img src="${day.icon}" alt="${day.description}">
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
            tempGraph += `<section class="item">
                            <p class="value">${element.temp}</p>
                            <p class="column" style="height:${50 / 70 * element.temp}px;"></p>
                            
                        </section>`;
            precipitationGraph += `<section class="item">
                                        <p class="value">${element.precipitation} мм</p>
                                        <p class="column" style="height:${ element.precipitation * 10 }px"></p>
                                    </section>`;
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

function extractFiveDaysForecastData(data) {
    let daysArray = [];

    data.list.forEach(element => {
        let elementDayName = new Date(element.dt * 1000).toLocaleString('ru-RU', {weekday: "short"});
        if (!daysArray.find(day => {
            if (day.dayName === elementDayName) {
                if (day.maxTemp < element.main.temp) {
                    day.maxTemp = Math.round(element.main.temp);
                    day.description = element.weather[0].description;
                    day.icon = `http://openweathermap.org/img/w/${element.weather[0].icon}.png`;
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
            console.log(element.weather[0].icon);
            newDay.icon = `http://openweathermap.org/img/w/${element.weather[0].icon}.png`;
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
        newGraphItem.time = new Date(element.dt * 1000).toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'});
        newGraphItem.temp = Math.round(element.main.temp);
        if (Math.round(element.main.temp) >= 0) {
            newGraphItem.aboveZeroTemp = Math.round(element.main.temp);
            newGraphItem.belowZeroTemp = 0;
        } else {
            newGraphItem.aboveZeroTemp = 0;
            newGraphItem.belowZeroTemp = -Math.round(element.main.temp);;
        }
        newGraphItem.precipitation = getPrecipitationVolume(element).toFixed(1);
        newGraphItem.windSpeed = Math.round(element.wind.speed);
        newGraphItem.windDirection = getWindDirection(element.wind.deg);
        graphsItems.push(newGraphItem);
    })
    console.log(graphsItems);
    return graphsItems;
}
