
function FiveDaysSlider() {
    this.next = document.getElementById('next-day');
    this.prev = document.getElementById('prev-day');
    this.initializeArrowEventListeners();
}

FiveDaysSlider.prototype = Object.create(Slider.prototype);

FiveDaysSlider.prototype.nextSlide = function() {
    this.changeSlide((this.current + 1) % this.daySlides.length);
},

FiveDaysSlider.prototype.previousSlide = function() {
    (this.current !== 0) ? this.changeSlide(this.current - 1) : this.changeSlide(this.daySlides.length - 1);
},

FiveDaysSlider.prototype.changeSlide = function(index) {
    removeDomClassName(this.daySlides, this.current, 'shown');
    removeDomClassName(this.windSlides, this.current, 'shown');
    removeDomClassName(this.precSlides, this.current, 'shown');
    removeDomClassName(this.slideNav, this.current, 'selected');
    this.current = index;
    addDomClassName(this.daySlides, this.current, 'shown');
    addDomClassName(this.windSlides, this.current, 'shown');
    addDomClassName(this.precSlides, this.current, 'shown');
    addDomClassName(this.slideNav, this.current, 'selected');
};

FiveDaysSlider.prototype.initializeSliderElements = function() {
    this.current = 0;
    this.daySlides = getElementsByQuery('.day-weather');
    this.windSlides = getElementsByQuery('.day-wind');
    this.precSlides = getElementsByQuery('.day-precepitation');
    this.slideNav = getElementsByQuery('.day-switcher .menu-link');
    this.initializeSlideNavListeners();
};

FiveDaysSlider.prototype.initializeArrowEventListeners = function() {
    this.next.addEventListener('click', () => {
        this.nextSlide();
    });
    this.prev.addEventListener('click', () => {
        this.previousSlide();
    });
};