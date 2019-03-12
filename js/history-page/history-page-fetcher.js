class HistoryPageFetcher extends Fetcher {

    getHistoricalReviewMock(city, renderCityFunction, renderFunction, transformFunction) {
        renderCityFunction(city);
        renderFunction(historicalReviewMock[city], transformFunction);
    }
}


