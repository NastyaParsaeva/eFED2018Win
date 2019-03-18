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
        loadContent(city);
    });
};

function loadContent(city) {
    showSpinner();
    indexPageFetcher.getWeatherDetailsAndReturnCoords(city, indexPageRenderer.renderWeatherDetails)
        .then(response => {
            indexPageRenderer.renderWeatherDetails(indexPageTransformer.extractWeatherDetails(response));
            const coords = indexPageTransformer.extractCityCoords(response);
            indexPageFetcher.getAirPollution(coords)
                .then(response => {
                    indexPageRenderer.renderAirPollution(indexPageTransformer.extractAirPollution(response)); 
                });
        });    
    indexPageFetcher.getFiveDaysWeather(city)
        .then(response => {
            indexPageRenderer.renderWeatherForecast(indexPageTransformer.extractFiveDaysForecastData(response));
            indexPageRenderer.renderGrahps(indexPageTransformer.extractGraphsData(response));
        });
    hideSpinner();
};

init();