const indexPageFetcher = new IndexPageFetcher();
const indexPageTransformer = new IndexPageTransformer();
const indexPageRenderer = new IndexPageRenderer();
const indexPageSlider = new Slider();

const DEFAULT_CITY = 'izhevsk';

function init() {
    indexPageRenderer.renderHeader(createUniqueInfoForSearchRowContent);
    indexPageRenderer.renderMain();
    indexPageRenderer.renderFooter();
    loadContent(sessionStorage.getItem('city') || DEFAULT_CITY);
    
    const searchField = document.getElementById('search-field');
    searchField.addEventListener('change', (event) => {
        const city = event.target.value;
        Utils.saveCityInSessionStorage(city);
        loadContent(city);
    });
};

async function loadContent(city) {
    Utils.showSpinner();
    indexPageRenderer.renderMainContent(createMainContentHtml);
    indexPageSlider.initSlider();
    Promise.all([indexPageFetcher.getWeatherDetailsAndReturnCoords(city), indexPageFetcher.getFiveDaysWeather(city)])
        .then(result => {
            if (result.some(element => !element)) {
                indexPageRenderer.renderCityNotFoundError(createCityNotFoundErrorMessage(city));
                return null;
            } else {
                const weatherDetails = result[0];
                indexPageRenderer.renderWeatherDetails(indexPageTransformer.extractWeatherDetails(weatherDetails));
                const coords = indexPageTransformer.extractCityCoords(weatherDetails);
                const fiveDaysWeather = result[1];
                indexPageRenderer.renderWeatherForecast(indexPageTransformer.extractFiveDaysForecastData(fiveDaysWeather));
                indexPageRenderer.renderGrahps(indexPageTransformer.extractGraphsData(fiveDaysWeather));
                return coords;
            }
        })
        .then(coords => {
            if (coords) {
                indexPageFetcher.getAirPollution(coords).then(airPollution => {
                    indexPageRenderer.renderAirPollution(indexPageTransformer.extractAirPollution(airPollution));
                });
            }
        })
        .then(() => {
            Utils.hideSpinner();
        })

};

init();