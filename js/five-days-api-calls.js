const APP_ID = 'cbb3210df49fdf1c3c675a785e42454b';
const 5_DAY_WEATHER_ENDPOINT = `http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=ru&APPID=${ APP_ID }&q=`;
const defaultCity = 'izhevsk';
const page = {
    init: function() {
        this.getWeatherDetails(defaultCity, this.render);

        const searchField = document.getElementById('search-field');
        searchField.addEventListener('change', (event) => {
            const city = event.target.value;
            console.log(this);
            this.getWeatherDetails(city, this.render);
        });
    },
    getWeatherDetails(city, callback) {
        const url = `${ WEATHER_DETAILS_ENDPOINT }${ city }`;
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (this.readyState === 4 && this.status === 200) {
                callback(JSON.parse(xhr.responseText));
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
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