const APP_ID = 'cbb3210df49fdf1c3c675a785e42454b';
const FIVE_DAY_WEATHER_ENDPOINT = `http://api.openweathermap.org/data/2.5/forecast?units=metric&lang=ru&APPID=${ APP_ID }&q=`;
const WEATHER_DETAILS_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&APPID=${ APP_ID }&q=`;
const defaultCity = 'izhevsk';

const slider = {

    next: document.getElementById('next-day'),
    prev: document.getElementById('prev-day'),

    
    initializeArrowEventListeners() {
        this.next.addEventListener('click', () => {
            this.nextSlide();
          });
        this.prev.addEventListener('click', () => {
          this.previousSlide();
        });
    },

    reinitializeSlider() {
      this.slides = document.getElementsByClassName('day-weather');
      this.slideNav = document.querySelectorAll('#day-switcher .menu-link');
      this.current = 0;
      
      for (let i = 0; i < this.slideNav.length; i++) {
        this.slideNav[i].addEventListener('click', () => {
          this.changeSlide(i);
        });
  }
    },
    changeSlide(index) {
      this.slides[this.current].classList.remove('shown');
      console.log(this.slides[this.current].classList);
      this.slideNav[this.current].classList.remove('selected');
      this.current = index;
      this.slides[this.current].classList.add('shown');
      this.slideNav[this.current].classList.add('selected');
    },
    nextSlide() {
      this.changeSlide((this.current + 1) % this.slides.length);
    },
    previousSlide() {
      (this.current !== 0) ? this.changeSlide(this.current - 1) : this.changeSlide(this.slides.length - 1);
    }
  }

const page = {
    init: function() {
        this.getFiveDaysForecast(defaultCity, this.renderFiveDaysForecast);
        this.getWeatherDetails(defaultCity, this.renderMoonAndSun);
        const searchField = document.getElementById('search-field');
        slider.initializeArrowEventListeners();
        searchField.addEventListener('change', (event) => {
            const city = event.target.value;
            console.log(this);
            this.getFiveDaysForecast(city, this.renderFiveDaysForecast);
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
        let hoursDiff = Math.floor((sunset - sunrise) / (60 * 60 * 1000));
        let minutesDiff = Math.floor((sunset - sunrise) / (60 * 1000) - hoursDiff * 60);
        
        
        insertElement('sunrise', `Восход - ${sunrise.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`);
        insertElement('sunset', `Заход - ${sunset.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`);
        insertElement('day-length', `Долгота дня - ${hoursDiff} ч ${minutesDiff} мин`);
        insertElement('current-location', `${Math.round(data.main.temp)}° ${data.name}, ${data.sys.country}`);
        insertElement('today', `${new Date(data.dt * 1000).toLocaleString('ru-RU', {weekday: 'long', day:'numeric', month: 'long'})}, сегодня`);
        setAttributes(document.getElementById('current-weather-icon'), {'src' : `http://openweathermap.org/img/w/${data.weather[0].icon}.png`, 'alt' : data.weather[0].description})
        
    },

    renderFiveDaysForecast(data) {        
        
        let dailyWeather = extractForcastParameters(data.list);

        let dayWeather = '';
        let wind = '';
        let precipitation = '';
        let daysList = '';

        dailyWeather.forEach(weather => {
            dayWeather += `<section class = "day-weather">
                                <p class="day-name">${weather.date}</p>
                                ${createPartDayWeatherHtml('Ночь', weather.night)}
                                ${createPartDayWeatherHtml('Утро', weather.morning)}
                                ${createPartDayWeatherHtml('День', weather.day)}
                                ${createPartDayWeatherHtml('Вечер', weather.evening)}
                            </section>`
            wind += `<section class = "day-wind">
                        ${createPartDayWindHtml(weather.night)}
                        ${createPartDayWindHtml(weather.morning)}
                        ${createPartDayWindHtml(weather.day)}
                        ${createPartDayWindHtml(weather.evening)}
                    </section>`;
            precipitation += `<section class = "day-precepitation">
                                ${createPartDayPrecipitationHtml(weather.night)}
                                ${createPartDayPrecipitationHtml(weather.morning)}
                                ${createPartDayPrecipitationHtml(weather.day)}
                                ${createPartDayPrecipitationHtml(weather.evening)}
                            </section>`;  
            daysList += `<li class="menu-link">${weather.date.slice(0, 2)}</li>`;
        })
        insertElement('daily-weather-container', dayWeather);
        insertElement('wind-container', wind);
        insertElement('precepitation-container', precipitation);
        insertElement('day-switcher', daysList);

        document.getElementById('daily-weather-container').firstChild.classList.add('shown');
        document.getElementById('day-switcher').firstChild.classList.add('selected');
        
        slider.reinitializeSlider();
    },


};

page.init();

function insertElement(destinationId, data) {
    document.getElementById(destinationId).innerHTML = data;
}

function extractForcastParameters(list) {
    console.log(list);
    let daylyWeather = [];

    for (let i = 0; i < list.length; i += 2) {
        let dayPartWeather = {};

        dayPart = definePartOfDay(new Date(list[i].dt * 1000).getHours());
        dayPartWeather.iconLink = `http://openweathermap.org/img/w/${list[i].weather[0].icon}.png`;
        dayPartWeather.temp = Math.round(list[i].main.temp);
        dayPartWeather.windSpeed = Math.round(list[i].wind.speed);
        dayPartWeather.precipitation = getPrecipitationVolume(list[i]).toFixed(1);
        dayPartWeather.description = list[i].weather[0].description;

        let date = new Date(list[i].dt * 1000).toLocaleString('ru-RU', {weekday: 'short', day:'numeric', month: 'short'});

        if (!daylyWeather.find(dayWeather => {
            if (dayWeather.date === date) {
                dayWeather[dayPart] = dayPartWeather;
                return dayWeather;
            }
        })) {
            let newForecastItem = {};
            newForecastItem.date = new Date(list[i].dt * 1000).toLocaleString('ru-RU', {weekday: 'short', day:'numeric', month: 'short'});
            newForecastItem[dayPart] = dayPartWeather;
            daylyWeather.push(newForecastItem);
        }
    }
    console.log(daylyWeather);
    return daylyWeather;
    
}

function definePartOfDay(hours) {
    if (hours < 6) {
        return 'night';
    } else if (hours < 12) {
        return 'morning';
    } else if (hours < 18) {
        return 'day';
    } else if (hours < 24) {
        return 'evening';
    }
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

function getPrecipitationLevel(prec) {
    if (prec < 1) {
        return 'low';
    } else if (prec < 2) {
        return 'middle';
    } else {
        return 'high';
    }
}

function setAttributes(element, attributes) {
    for(var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}