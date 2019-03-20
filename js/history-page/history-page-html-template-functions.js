function createTableDataHtml(degrees) {
    return createSpanHtml(`${degrees}°`);
}

function createSpanHtml(spanContent) {
    return `<span>${spanContent}</span>`;
}

function createHistoryPageMainContentHtml() {
    return `<section class="table-row">
                <span>&nbsp;</span>
                <span>Январь</span>
                <span>Февраль</span>
                <span>Март</span>
                <span>Апрель</span>
                <span>Май</span>
                <span>Июнь</span>
                <span>Июль</span>
                <span>Август</span>
                <span>Сентябрь</span>
                <span>Октябрь</span>
                <span>Ноябрь</span>
                <span>Декабрь</span>
            </section>
            <section id="average-max" class="table-row">
            </section>
            <section id="average-min" class="table-row">
            </section>
            <section id="highest-max" class="table-row">
            </section>
            <section id="lowest-min" class="table-row">
            </section>`;
}

function createHistoryPageUniqueInfoFromSearchRowContent() {
    return '<span id="location" class="current-location"></span>';
}