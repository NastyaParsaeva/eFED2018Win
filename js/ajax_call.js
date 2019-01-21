const APP_ID = 'f9a8867923bcc86f488c9142432dd2de';
const WEATHER_DETAILS_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&APPID=${ APP_ID }&q=`;
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
        
        document.getElementById('chosen-location').innerHTML = `${data.name}, ${data.sys.country}`;
        document.getElementById('today-weekday').innerHTML = new Date(data.dt * 1000).toLocaleString('ru-RU', {weekday: "long"});
        document.getElementById('weather-description').innerHTML = data.weather[0].description;
        document.getElementById('weather-icon').setAttribute('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
        document.getElementById('current-temperature').innerHTML = Math.round(data.main.temp);
        document.getElementById('today-humidity').innerHTML = data.main.humidity;
        document.getElementById('today-wind-speed').innerHTML = data.wind.speed;
        if (data.rain) {
            data.rain['1h'] ? document.getElementById('today-precipitation').innerHTML = data.rain['1h'] : 
                              document.getElementById('today-precipitation').innerHTML = data.rain['3h'] ;
        } else {
            if (data.snow) {
                data.snow['1h'] ? document.getElementById('today-precipitation').innerHTML = data.snow['1h'] : 
                                  document.getElementById('today-precipitation').innerHTML = data.snow['3h'];
            } else {
                document.getElementById('today-precipitation').innerHTML = 0;
            }
        }
        // DOM manipulation 
    },
};

page.init();