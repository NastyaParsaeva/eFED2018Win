function HistoryPageTransformer() {}

HistoryPageTransformer.prototype = Object.create(Transformer.prototype);

HistoryPageTransformer.prototype.extractHistoryTableData = function(data) {
    // console.log(this);
    const months = mapToMonthData(data);
    const minMaxPerMonth = months.map(month => {
        return getMinMaxForMonth(month);
    });
    return minMaxPerMonth;
};


mapToMonthData = function(data) {
    const years = Object.values(data);
    const months = [];
    years.forEach((year)=> {
        for(let i = 0; i < 12; i++) {
            months[i] ? months[i].push(year[i]) : months[i] = [];
        }
    });
    console.log(months);
    return months;
};

getMinMaxForMonth = function(monthData) {
    let absMin = monthData[0].min,
        absMax = monthData[0].max,
        minSum = 0,
        maxSum = 0;
    
    monthData.forEach(month=> {
        minSum += month.min;
        maxSum += month.max;
        absMax = Math.max(absMax, month.max);
        absMin = Math.min(absMin, month.min);
    });

    return {
        absMax,
        absMin,
        avMax: Math.round(maxSum / monthData.length),
        avMin: Math.round(minSum / monthData.length),
    };
};