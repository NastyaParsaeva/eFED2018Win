const indexPageFetcher = new IndexPageFetcher();
const indexPageTransformer = new IndexPageTransformer();
const indexPageRenderer = new IndexPageRenderer();

const DEFAULT_CITY = 'izhevsk';

function init() {
    indexPageRenderer.renderHeader(createUniqueInfoForSearchRowContent);
    indexPageRenderer.renderMain(createMainContentHtml);
    indexPageRenderer.renderFooter();
    loadContent(sessionStorage.getItem('city') || DEFAULT_CITY);
    const indexPageSlider = new Slider('.graph', '.graph-controller .menu-link');
    const searchField = document.getElementById('search-field');
    searchField.addEventListener('change', (event) => {
        const city = event.target.value;
        saveCityInSessionStorage(city);
        this.loadContent(city);
    });
};

init();

function loadContent(city) {
    showSpinner();
    indexPageFetcher.getWeatherDetailsAndReturnCoords(city, indexPageRenderer.renderWeatherDetails)
        .then((coords) => {
            indexPageFetcher.getAirPollution(coords, indexPageRenderer.renderAirPollution);
        });
    indexPageFetcher.getFiveDaysWeather(city, indexPageRenderer.renderWeatherForecast, indexPageTransformer.extractFiveDaysForecastData, 
        indexPageRenderer.renderGrahps, indexPageTransformer.extractGraphsData);
    hideSpinner();
};
