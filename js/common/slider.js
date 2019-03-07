function Slider(slidesCssQuery, slideNavCssQuery) {
    this.slides = getElementsByQuery(slidesCssQuery);
    this.slideNav = getElementsByQuery(slideNavCssQuery);
    this.current = 0;
    this.initializeSlideNavListeners();
}

Slider.prototype.initializeSlideNavListeners = function() {
    for (let i = 0; i < this.slideNav.length; i++) {
        this.slideNav[i].addEventListener('click', () => {
            this.changeSlide(i);
        });
    }
};

Slider.prototype.changeSlide = function(index) {
    removeDomClassName(this.slides, this.current, 'shown');
    removeDomClassName(this.slideNav, this.current, 'selected');
    this.current = index;
    addDomClassName(this.slides, this.current, 'shown');
    addDomClassName(this.slideNav, this.current, 'selected');
};
