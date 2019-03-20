/*
Renderer – получает данные и отображает их в DOM
Renderer – Базовый класс он умеет отрисовывать футер и хедер.
От него наследуются три класса 5 дней погода, Исторические данные и погода на сегодня
*/
class Renderer {
    
    setAttributesForImage(id, iconLink, altText) {
        const elem = document.getElementById(id);
        elem.setAttribute('src', iconLink);
        elem.setAttribute('alt', altText);
    }

    insertElementIntoDom(destinationId, data) {
        document.getElementById(destinationId).innerHTML = data;
    }

    renderHeader(HeaderUniqueContent) {
        const header = document.createElement('header');
        header.innerHTML = createHeaderCommonContent(HeaderUniqueContent);
        document.body.appendChild(header);
    }

    renderFooter() {
        const footer = document.createElement('footer');
        footer.innerHTML = createFooterContent();
        document.body.appendChild(footer);
    }

    renderMain() {
        const main = document.createElement('main');
        main.id = 'main-content';
        document.body.appendChild(main);
    }

    renderMainContent(mainContentTemplateFunction) {
        this.insertElementIntoDom('main-content', mainContentTemplateFunction());
    }

    renderCityNotFoundError(htmlError) {
        this.insertElementIntoDom('main-content', htmlError);
    }
}





