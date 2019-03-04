const indexPageFetcher = new IndexPageFetcher();
const indexPageTransformer = new IndexPageTransformer();
const indexPageRenderer = new IndexPageRenderer();

const DEFAULT_CITY = 'izhevsk';
const DEFAULT_COORDS = '56,53';
// coords: '',

function init() {
    indexPageRenderer.renderHeader();
    indexPageRenderer.renderMain(createMainContentHtml);
    indexPageRenderer.renderFooter();
    loadContent(DEFAULT_CITY, DEFAULT_COORDS);
    // slider.initSlider();
    // const searchField = document.getElementById('search-field');
    // searchField.addEventListener('change', (event) => {
    //     const city = event.target.value;
    //     this.loadContent(city, coords);
    // });
};

init();


function loadContent(city, coords) {
    showSpinner();
    // this.getWeatherDetails(city, this.renderWeatherDetails);
    // this.getAirPollution(coords, this.renderAirPollution);
    // this.getFiveDaysWeather(city, this.renderWeatherForecast, this.renderGrahps);

    
    
    indexPageFetcher.getWeatherDetails(city, indexPageRenderer.renderWeatherDetails);
    indexPageFetcher.getAirPollution(coords, indexPageRenderer.renderAirPollution);
    indexPageFetcher.getFiveDaysWeather(city, indexPageRenderer.renderWeatherForecast, indexPageTransformer.extractFiveDaysForecastData, 
        indexPageRenderer.renderGrahps, indexPageTransformer.extractGraphsData);
    hideSpinner();
};
