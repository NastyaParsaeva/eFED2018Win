const historyPageFetcher = new HistoryPageFetcher();
const historyPageTransformer = new HistoryPageTransformer();
const historyPageRenderer = new HistoryPageRenderer();
const DEFAULT_CITY = 'Izhevsk';


function init() {
    historyPageRenderer.renderHeader(createHistoryPageUniqueInfoFromSearchRowContent);
    historyPageRenderer.renderMain();
    historyPageRenderer.renderFooter();
    loadContent(getProperCity(sessionStorage.getItem('city') || DEFAULT_CITY));
    const searchField = document.getElementById('search-field');
    searchField.addEventListener('change', (event) => {
        loadContent(getProperCity(event.target.value));
    });
};

function loadContent(city) {
    Utils.showSpinner();
    historyPageRenderer.renderMainContent(createHistoryPageMainContentHtml);
    historyPageFetcher.getHistoricalReviewMock(city, historyPageRenderer.renderCity, 
        historyPageRenderer.renderHistoricalReview, historyPageTransformer.extractHistoryTableData);
    Utils.hideSpinner();
};

function getRandomCity() {
    const cityNumber = Math.floor(Math.random() * 3);
    switch (cityNumber) {
    case 0: return 'Izhevsk';
    case 1: return 'London';
    case 2: return 'Vladivostok';
    }
}

function getProperCity(city) {
    city = Utils.capitalizeFirstLetter(city);
    if (city !== 'Izhevsk' && city !== 'London' && city !== 'Vladivostok') {
        city = getRandomCity();
    }
    Utils.saveCityInSessionStorage(city);
    return city;
}

init();