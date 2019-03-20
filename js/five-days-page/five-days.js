const fiveDaysFetcher = new FiveDaysPageFetcher();
const fiveDaysTransformer = new FiveDaysPageTransformer();
const fiveDaysRenderer = new FiveDaysPageRenderer();
const slider = new FiveDaysSlider();
const DEFAULT_CITY = 'izhevsk';

function init() {
    fiveDaysRenderer.renderHeader(createFiveDaysPageUniqueInfoFromSearchRowContent);
    fiveDaysRenderer.renderMain();
    fiveDaysRenderer.renderAsideElement();
    fiveDaysRenderer.renderFooter();
    loadContent(sessionStorage.getItem('city') || DEFAULT_CITY, slider);
    const searchField = document.getElementById('search-field');
    searchField.addEventListener('change', (event) => {
        const city = event.target.value;
        Utils.saveCityInSessionStorage(city);
        this.loadContent(city, slider);
    });
};

init();

function loadContent(city, slider) {
    Utils.showSpinner();
    fiveDaysRenderer.renderMainContent(createFiveDaysMainContentHtml);
    fiveDaysRenderer.renderAsideElementContent(createFiveDaysAsideContentHtml());
    Promise.all([fiveDaysFetcher.getFiveDaysForecast(city), fiveDaysFetcher.getWeatherDetails(city)])
    .then(result => {
        if (result.some(element => !element)) {
            fiveDaysRenderer.renderCityNotFoundError(createCityNotFoundErrorMessage(city));
            fiveDaysRenderer.renderAsideElementContent('');
            return false;
        } else {
            const fiveDaysWeather = result[0];
            fiveDaysRenderer.renderFiveDaysForecast(fiveDaysTransformer.extractForcastParameters(fiveDaysWeather));
            const weatherDetails = result[1];
            fiveDaysRenderer.renderSunDetails(fiveDaysTransformer.extractSunDetails(weatherDetails));
            fiveDaysRenderer.renderCurrentParams(fiveDaysTransformer.extractCurrentParams(weatherDetails));
            return true;
        }
    })
    .then((result) => {
        if (result) {
            slider.initializeSliderElements();
        }
        Utils.hideSpinner();
    })
};
