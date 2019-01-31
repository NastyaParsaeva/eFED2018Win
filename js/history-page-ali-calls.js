defaultCity = "Izhevsk";

const page = {
    init: function() {
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

    getHistoricalReviewMock(city, ...callbacks) {
        this.renderCity(city);
        callbacks.forEach(callback => {
            console.log(historicalReviewMock);
            callback(historicalReviewMock[city]);
        });
    },

    renderCity(city) {
        insertElement('location', city);
    },

    renderHistoricalReview(data) {
        console.log(data);
        const historyTableData = extractHistoryTableData(data);
        
        let averageMaxHtml = '<span>Средний максимум</span>';
        let averageMinHtml = '<span>Средний минимум</span>';
        let highestMaxHtml = '<span>Рекордный максимум</span>';
        let lowestMinHtml = '<span>Рекордный минимум</span>';

        historyTableData.forEach(month => {
            averageMaxHtml += `<span>${month.averageMax}°</span>`;
            averageMinHtml += `<span>${month.averageMin}°</span>`;
            highestMaxHtml += `<span>${month.highestMax}°</span>`;
            lowestMinHtml += `<span>${month.lowestMin}°</span>`;
        })

        insertElement('average-max', averageMaxHtml);
        insertElement('average-min', averageMinHtml);
        insertElement('highest-max', highestMaxHtml);
        insertElement('lowest-min', lowestMinHtml);
        
    },
}

function extractHistoryTableData(data) {

    const minMaxPerMonth = [];
    
    const highestMax = [];
    const lowestMin = [];
    const minSummary = [];
    const maxSummary = [];

    for (let i = 0; i < 12; i++) {
        minSummary.push(data[Object.keys(data)[0]][i].min);
        maxSummary.push(data[Object.keys(data)[0]][i].max);
        highestMax.push(data[Object.keys(data)[0]][i].max);
        lowestMin.push(data[Object.keys(data)[0]][i].min);
    }

    const minMaxPerYear = Object.values(data);
    minMaxPerYear.forEach(year => {
        for (let i = 0; i < 12; i++) {
            minSummary[i] += (year[i].min);
            maxSummary[i] += year[i].max;
            if (highestMax[i] < year[i].max) {
                highestMax[i] = year[i].max;
            }
            if (lowestMin[i] > year[i].min) {
                lowestMin[i] = year[i].min;
            }
        }
    })
    
    for (let i = 0; i < 12; i++) {
        monthParameters = {};
        monthParameters.averageMin = Math.round(minSummary[i] / Object.keys(data).length);
        monthParameters.averageMax = Math.round(maxSummary[i] / Object.keys(data).length);
        monthParameters.highestMax = highestMax[i];
        monthParameters.lowestMin = lowestMin[i];
        minMaxPerMonth.push(monthParameters);
    }
    console.log(minMaxPerMonth);
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