const fiveDaysFetcher = new FiveDaysPageFetcher();
const fiveDaysTransformer = new FiveDaysPageTransformer();
const fiveDaysRenderer = new FiveDaysPageRenderer();
let fiveDaysSlider;

const DEFAULT_CITY = 'izhevsk';
const DEFAULT_COORDS = '56,53';
// coords: '',

function init() {
    fiveDaysRenderer.renderHeader(createFiveDaysPageUniqueInfoFromSearchRowContent);
    fiveDaysRenderer.renderMain(createFiveDaysMainContentHtml);
    fiveDaysRenderer.renderAsideElement();
    fiveDaysRenderer.renderFooter();
    loadContent(DEFAULT_CITY);
    const searchField = document.getElementById('search-field');
    fiveDaysPageSlider = new FiveDaysSlider();
    
    searchField.addEventListener('change', (event) => {
        const city = event.target.value;
        this.loadContent(city);
    });
};

init();

function loadContent(city) {
    showSpinner();   
    fiveDaysFetcher.getFiveDaysForecast(city, fiveDaysRenderer.renderFiveDaysForecast, 
        fiveDaysTransformer.extractForcastParameters);
    fiveDaysFetcher.getWeatherDetails(city, fiveDaysRenderer.renderSunDetails, fiveDaysTransformer.extractSunDetails,
        fiveDaysRenderer.renderCurrentParams, fiveDaysTransformer.extractCurrentParams);
    hideSpinner();
};
