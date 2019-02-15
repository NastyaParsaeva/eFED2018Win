function mapToMonthData(data) {
    const years = Object.values(data);
    const months = [];
    years.forEach((year)=> {
        for(let i=0;i<12;i++) {
            months[i] ? months[i].push(year[i]) : months[i] = [];
        }
    })
    console.log(months);
    return months;
}

function getMinMaxForMonth(monthData) {
    let absMin = monthData[0].min;
    let absMax = monthData[0].max;
    let minSum = 0;
    let maxSum = 0;
    
    monthData.forEach(month=> {
        minSum += month.min;
        maxSum += month.max;
        absMax = Math.max(absMax, month.max) 
        absMin = Math.min(absMin, month.min)
    });

    return {
        absMax,
        absMin,
        avMax: Math.round(maxSum / monthData.length),
        avMin: Math.round(minSum / monthData.length),
    }
}

function extractHistoryTableData2(data) {

    const months = mapToMonthData(data);
    const minMaxPerMonth = months.map(month => {
        return getMinMaxForMonth(month);
    })
    return minMaxPerMonth;
}


function getRandomCity() {
    const cityNumber = Math.floor(Math.random() * 3);
    switch (cityNumber) {
    case 0: return 'Izhevsk';
    case 1: return 'London';
    case 2: return 'Vladivostok';
    }
}

const page = {
    
    defaultCity: 'Izhevsk',

    init() {
        showSpinner();
        this.getHistoricalReviewMock(this.defaultCity, this.renderHistoricalReview);
        const searchField = document.getElementById('search-field');
        searchField.addEventListener('change', (event) => {
            let city = capitalizeFirstLetter(event.target.value);
            if (city !== 'Izhevsk' && city !== 'London' && city !== 'Vladivostok') {
                city = getRandomCity();
            }
            this.getHistoricalReviewMock(city, this.renderHistoricalReview);
        });
        hideSpinner();
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

        let averageMaxHtml = createSpanHtml('Средний максимум');
        let averageMinHtml = createSpanHtml('Средний минимум');
        let highestMaxHtml = createSpanHtml('Рекордный максимум');
        let lowestMinHtml = createSpanHtml('Рекордный минимум');

        for (let i = 0; i < 12; i++) { 
            averageMaxHtml += createTableDataHtml(historyTableData[i].avMax);
            averageMinHtml += createTableDataHtml(historyTableData[i].avMin);
            highestMaxHtml += createTableDataHtml(historyTableData[i].absMax);
            lowestMinHtml += createTableDataHtml(historyTableData[i].absMin);
        }

        insertElementIntoDom('average-max', averageMaxHtml);
        insertElementIntoDom('average-min', averageMinHtml);
        insertElementIntoDom('highest-max', highestMaxHtml);
        insertElementIntoDom('lowest-min', lowestMinHtml);
    },
};

page.init();


