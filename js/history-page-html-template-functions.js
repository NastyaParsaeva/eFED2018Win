function createTableDataHtml(degrees) {
    return createSpanHtml(`${degrees}°`);
}

function createSpanHtml(spanContent) {
    return `<span>${spanContent}</span>`;
}