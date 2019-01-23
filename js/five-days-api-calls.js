const APP_ID = 'cbb3210df49fdf1c3c675a785e42454b';
const FIVE_DAY_WEATHER_ENDPOINT = `http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=ru&APPID=${ APP_ID }&q=`;
const WEATHER_DETAILS_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&APPID=${ APP_ID }&q=`;
const defaultCity = 'izhevsk';
const page = {
    init: function() {
        //this.getFiveDaysForecast(defaultCity, this.render);
        this.getWeatherDetails(defaultCity, this.renderMoonAndSun);
        const searchField = document.getElementById('search-field');
        searchField.addEventListener('change', (event) => {
            const city = event.target.value;
            console.log(this);
            //this.getFiveDaysForecast(city, this.render);
            this.getWeatherDetails(city, this.renderMoonAndSun);
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

    getFiveDaysForecast(city, ...callbacks) {
        const url = `${ FIVE_DAY_WEATHER_ENDPOINT }${ city }`;
        this.getData(url, callbacks);
    },

    getWeatherDetails(city, ...callbacks) {
        const url = `${ WEATHER_DETAILS_ENDPOINT }${ city }`;
        this.getData(url, callbacks);
    },

    renderMoonAndSun(data) {
        console.log(data);
        let sunrise = new Date(data.sys.sunrise * 1000);
        let sunset = new Date(data.sys.sunset * 1000);

        insertElement('sunrise', `Восход - ${sunrise.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`);
        insertElement('sunset', `Заход - ${sunset.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`);
        //insertElement('day-length', `Долгота дня - ${Math.floor((sunset - sunrise) / (60 * 60 * 1000))} ч ${Math.floor((sunset - sunrise) / (60 * 1000))} мин`)
        
    },

    render(data) {        
        console.log(data);
        data.list.forEach(element => {
            console.log(new Date(element.dt * 1000));
        });

        let daySwitcher = document.createElement('ul');
        let windForecast = document.createElement('section');
        let dayWind;
        // let dailyForecast = document.createElement('section');
        // let dayWeather;

        for (let i = 0; i < data.list.length; i += 2) {
            console.log(new Date(data.list[i].dt * 1000));
            let newSliderSwitcher = document.createElement(`li`);
            let isNewDay = true;
            newSliderSwitcher.classList.add('menu-link');
            newSliderSwitcher.innerHTML = `${new Date(data.list[i].dt * 1000).toLocaleString('ru-RU', {weekday: "short"})}`;
            if (!newSliderSwitcher.isEqualNode(daySwitcher.lastChild))  {
                isNewDay = true;
                daySwitcher.appendChild(newSliderSwitcher);
            } else {
                isNewDay = false;
            }

            if (isNewDay) {
                dayWind = document.createElement(`section`);
                dayWind.classList.add('day-wind');
                // dayWeather = document.createElement('section');
                // dayWeather.classList.add('day-weather');
                //TODO: replace first letter of weekday by capital letter
                // let dayNameNode = document.createElement(`p`);
                // dayNameNode.classList.add(`day-name`);
                // dayNameNode.innerHTML = `${new Date(data.list[i].dt * 1000).toLocaleString('ru-RU', {weekday: "short"})}, 
                //                     ${new Date(data.list[i].dt * 1000).toLocaleString('ru-RU', {day: 'numeric', month: 'long'})}`;
                // dayWeather.appendChild(dayNameNode);
            } else {
                dayWind = windForecast.lastChild;
                // dayWeather = dailyForecast.lastChild;
            }
            let windItemNode = document.createElement(`span`);
            windItemNode.classList.add(`item`);
            windItemNode.innerHTML = `<p><span>${Math.round(data.list[i].wind.speed)}</span></p>`;
            dayWind.appendChild(windItemNode);
            windForecast.appendChild(dayWind);
            // dayWeather.appendChild()
        }
        daySwitcher.firstChild.classList.add('selected');
        document.getElementById('day-switcher').appendChild(daySwitcher);
        document.getElementById('weather-container').insertBefore(windForecast, document.getElementById('precepitation-forecast-label'));
        // document.getElementById('five-days-container').insertBefore(dailyForecast, document.getElementById('next-day-container'));
        
        // DOM manipulation 
    },


};

page.init();

function insertElement(destinationId, data) {
    document.getElementById(destinationId).innerHTML = data;
}