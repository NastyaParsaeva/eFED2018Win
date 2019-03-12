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
    loadContent(DEFAULT_CITY, slider);
    const searchField = document.getElementById('search-field');
    searchField.addEventListener('change', (event) => {
        const city = event.target.value;
        this.loadContent(city, slider);
    });
};

init();

function loadContent(city, slider) {
    showSpinner();   
    
    fiveDaysFetcher.getFiveDaysForecast(city, fiveDaysRenderer.renderFiveDaysForecast, 
        fiveDaysTransformer.extractForcastParameters, slider);
    fiveDaysFetcher.getWeatherDetails(city, fiveDaysRenderer.renderSunDetails, fiveDaysTransformer.extractSunDetails,
        fiveDaysRenderer.renderCurrentParams, fiveDaysTransformer.extractCurrentParams);
    
    hideSpinner();
};
