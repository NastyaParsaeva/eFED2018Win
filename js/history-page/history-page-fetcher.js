function HistoryPageFetcher() {
}

HistoryPageFetcher.prototype.getHistoricalReviewMock = function(city, renderCityFunction, renderFunction, transformFunction) {
    renderCityFunction(city);
    renderFunction(historicalReviewMock[city], transformFunction);
};
