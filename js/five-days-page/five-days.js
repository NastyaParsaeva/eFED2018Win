const fiveDaysFetcher = new FiveDaysPageFetcher();
const fiveDaysTransformer = new FiveDaysPageTransformer();
const fiveDaysRenderer = new FiveDaysPageRenderer();
let fiveDaysSlider;

const DEFAULT_CITY = 'izhevsk';
const DEFAULT_COORDS = '56,53';
// coords: '',

function init() {
    fiveDaysRenderer.renderHeader();
    fiveDaysRenderer.renderMain(createFiveDaysMainContentHtml);
    fiveDaysRenderer.renderAsideElement();
    fiveDaysRenderer.renderFooter();
    loadContent(DEFAULT_CITY, DEFAULT_COORDS);
    indexPageSlider = new Slider('.graph', '.graph-controller .menu-link');
    
    const searchField = document.getElementById('search-field');
    searchField.addEventListener('change', (event) => {
        const city = event.target.value;
        this.loadContent(city, coords);
    });
};

init();


function loadContent(city, coords) {
    showSpinner();
    
    fiveDaysFetcher.getFiveDaysForecast(city, fiveDaysRenderer.renderFiveDaysForecast, 
        fiveDaysTransformer.extractForcastParameters);
    fiveDaysFetcher.getWeatherDetails(city, fiveDaysRenderer.renderSunDetails, fiveDaysTransformer.extractSunDetails,
        fiveDaysRenderer.renderCurrentParams, fiveDaysTransformer.extractCurrentParams);

    hideSpinner();
};
