/*
Renderer – получает данные и отображает их в DOM
Renderer – Базовый класс он умеет отрисовывать футер и хедер. 
От него наследуются три класса 5 дней погода, Исторические данные и погода на сегодня
*/
function Renderer() {

}

Renderer.prototype.setAttributesForImage = function(id, iconLink, altText) {
    const elem = document.getElementById(id);
    elem.setAttribute('src', iconLink);
    elem.setAttribute('alt', altText);
};

Renderer.prototype.insertElementIntoDom = function(destinationId, data) {
    document.getElementById(destinationId).innerHTML = data;
};

Renderer.prototype.renderHeader = function() {
    const header = document.createElement('header');
    header.innerHTML = createHeaderCommonContent();
    document.body.appendChild(header); 
};

Renderer.prototype.renderFooter = function() {
    const footer = document.createElement('footer');
    footer.innerHTML = createFooterContent();
    document.body.appendChild(footer);
};

Renderer.prototype.renderMain = function(mainContentTemplateFunction) {
    const main = document.createElement('main');
    main.innerHTML = mainContentTemplateFunction();
    document.body.appendChild(main);
}