defaultCity = 'Izhevsk';

const page = {
    init() {
        this.getHistoricalReviewMock(defaultCity, this.renderHistoricalReview);
        const searchField = document.getElementById('search-field');
        searchField.addEventListener('change', (event) => {
            let city = capitalizeFirstLetter(event.target.value);
            if (city !== 'Izhevsk' && city !== 'London' && city !== 'Vladivostok') {
                city = getRandomCity();
            }
            this.getHistoricalReviewMock(city, this.renderHistoricalReview);
        });
    },

    getHistoricalReviewMock(city, callback) {
        this.renderCity(city);
        callback(historicalReviewMock[city]);
    },

    renderCity(city) {
        insertElementIntoDom('location', city);
    },

    renderHistoricalReview(data) {
        const historyTableData = extractHistoryTableData2(data);

        let averageMaxHtml = '<span>Средний максимум</span>';
        let averageMinHtml = '<span>Средний минимум</span>';
        let highestMaxHtml = '<span>Рекордный максимум</span>';
        let lowestMinHtml = '<span>Рекордный минимум</span>';

        for (let i = 0; i < 12; i++) { 
            averageMaxHtml += createTableDataHtml(historyTableData.averageMax[i]);
            averageMinHtml += createTableDataHtml(historyTableData.averageMin[i]);
            highestMaxHtml += createTableDataHtml(historyTableData.highestMax[i]);
            lowestMinHtml += createTableDataHtml(historyTableData.lowestMin[i]);
        }

        insertElementIntoDom('average-max', averageMaxHtml);
        insertElementIntoDom('average-min', averageMinHtml);
        insertElementIntoDom('highest-max', highestMaxHtml);
        insertElementIntoDom('lowest-min', lowestMinHtml);
    },
};

function extractHistoryTableData2(data) {
    const minMaxPerMonth = {
        averageMax: [],
        averageMin: [],
        highestMax: [],
        lowestMin: [],
    };

    const minSummary = [];
    const maxSummary = [];

    for (let i = 0; i < 12; i++) {
        const firstYearTemp = data[Object.keys(data)[0]];
        minSummary.push(firstYearTemp[i].min);
        maxSummary.push(firstYearTemp[i].max);
        minMaxPerMonth.highestMax.push(firstYearTemp[i].max);
        minMaxPerMonth.lowestMin.push(firstYearTemp[i].min);
    }

    const tempPerYear = Object.values(data);
    tempPerYear.forEach((year) => {
        for (let i = 0; i < 12; i++) {
            minSummary[i] += year[i].min;
            maxSummary[i] += year[i].max;
            minMaxPerMonth.highestMax[i] = Math.max(minMaxPerMonth.highestMax[i], year[i].max);
            minMaxPerMonth.highestMax[i] = Math.min(minMaxPerMonth.lowestMin[i], year[i].min);
        }
    });
    for (let i = 0; i < 12; i++) {
        minMaxPerMonth.averageMax[i] = Math.round(maxSummary[i] / Object.keys(data).length);
        minMaxPerMonth.averageMin[i] = Math.round(minSummary[i] / Object.keys(data).length);
    }
    return minMaxPerMonth;
}
page.init();

function getRandomCity() {
    const cityNumber = Math.floor(Math.random() * 3);
    switch (cityNumber) {
    case 0: return 'Izhevsk';
    case 1: return 'London';
    case 2: return 'Vladivostok';
    }
}

function createTableDataHtml(degrees) {
    return `<span>${degrees}°</span>`;
}