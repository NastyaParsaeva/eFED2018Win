class HistoryPageRenderer extends Renderer {
    
    renderCity(city) {
        insertElementIntoDom('location', city);
    }

    renderHistoricalReview(data, transformFunction) {
        const historyTableData = transformFunction(data);
        let averageMaxHtml = createSpanHtml('Средний максимум'), averageMinHtml = createSpanHtml('Средний минимум'), highestMaxHtml = createSpanHtml('Рекордный максимум'), lowestMinHtml = createSpanHtml('Рекордный минимум');
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
    }
}
