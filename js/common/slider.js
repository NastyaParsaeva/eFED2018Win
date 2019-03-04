function Slider(slidesCssQuery, slideNavCssQuery) {
    this.slides = document.querySelectorAll(slidesCssQuery);
    this.slideNav = document.querySelectorAll(slideNavCssQuery);
    this.current = 0;
    this.initSlideNavListeners();
}

Slider.prototype.initSlideNavListeners = function() {
    for (let i = 0; i < this.slideNav.length; i++) {
        this.slideNav[i].addEventListener('click', () => {
            this.changeSlide(i);
        });
    }
};

Slider.prototype.changeSlide = function(index) {
    this.removeDomClassName(this.slides, this.current, 'shown');
    this.removeDomClassName(this.slideNav, this.current, 'selected');
    this.current = index;
    this.addDomClassName(this.slides, this.current, 'shown');
    this.addDomClassName(this.slideNav, this.current, 'selected');
};

Slider.prototype.addDomClassName = function(elementsArray, id, className) {
    elementsArray[id].classList.add(className);
};

Slider.prototype.removeDomClassName = function(elementsArray, id, className) {
    elementsArray[id].classList.remove(className);
};