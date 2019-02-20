const APP_ID = 'f9a8867923bcc86f488c9142432dd2de';
const WEATHER_DETAILS_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&APPID=${APP_ID}&q=`;
const AIR_POLLUTION_ENDPOINT = ['https://api.openweathermap.org/pollution/v1/co/', `/current.json?appid=${APP_ID}`];
const FIVE_DAY_WEATHER_ENDPOINT = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=ru&APPID=${APP_ID}&q=`;
