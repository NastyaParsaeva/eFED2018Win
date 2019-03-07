function createFooterContent() {
    return '<p lang="en">2019 © Copyright</p>';
}

function createHeaderCommonContent(getUniqueInfoForSearchRow) {
    return `<nav>
                <ul class="navigation">
                    <li class="menu-link selected"><a href="index.html">Сегодня</a></li>
                    <li class="menu-link"><a href="five-days-weather.html">5 дней</a></li>
                    <li class="menu-link"><a href="history-page.html">История погоды</a></li>
                </ul>
            </nav>
            <section class="search-row">
                <div id="unique-info-in-search-row">
                ${getUniqueInfoForSearchRow()}
                </div>
                <section class="search-field-container">
                    <label for="search-field" id="search-field-label">&nbsp;</label>
                    <input id="search-field" type="search" pattern="[А-ЯЁ]{1}[^0-9]+" placeholder="Поиск"/>
                </section>
            </section>`;
}