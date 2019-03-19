const fiveDaysFetcher = new FiveDaysPageFetcher();
const fiveDaysTransformer = new FiveDaysPageTransformer();
const fiveDaysRenderer = new FiveDaysPageRenderer();

const DEFAULT_CITY = 'izhevsk';

function init() {
    fiveDaysRenderer.renderHeader(createFiveDaysPageUniqueInfoFromSearchRowContent);
    fiveDaysRenderer.renderMain(createFiveDaysMainContentHtml);
    fiveDaysRenderer.renderAsideElement();
    fiveDaysRenderer.renderFooter();
    const slider = new FiveDaysSlider();
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
    fiveDaysFetcher.getFiveDaysForecast(city)
        .then(response => {
            fiveDaysRenderer.renderFiveDaysForecast(fiveDaysTransformer.extractForcastParameters(response));
            slider.initializeSliderElements();
        });
    fiveDaysFetcher.getWeatherDetails(city)
        .then(response => {
            fiveDaysRenderer.renderSunDetails(fiveDaysTransformer.extractSunDetails(response));
            fiveDaysRenderer.renderCurrentParams(fiveDaysTransformer.extractCurrentParams(response));
        });
    Utils.hideSpinner();
};
