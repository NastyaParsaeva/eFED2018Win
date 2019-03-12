
function FiveDaysSlider() {
    this.next = document.getElementById('next-day');
    this.prev = document.getElementById('prev-day');
    this.initializeArrowEventListeners();
}

FiveDaysSlider.prototype = Object.create(Slider.prototype);

FiveDaysSlider.prototype.nextSlide = function() {
    this.changeSlide((this.current + 1) % this.slidesArrayContainer.daySlides.length);
},

FiveDaysSlider.prototype.previousSlide = function() {
    (this.current !== 0) ? this.changeSlide(this.current - 1) : this.changeSlide(this.slidesArrayContainer.daySlides.length - 1);
},

FiveDaysSlider.prototype.changeSlide = function(index) {
    for (slidesType in this.slidesArrayContainer) {
        removeDomClassName(this.slidesArrayContainer[slidesType], this.current, 'shown');
    }
    removeDomClassName(this.slideNav, this.current, 'selected');
    this.current = index;

    for (slidesType in this.slidesArrayContainer) {
        addDomClassName(this.slidesArrayContainer[slidesType], this.current, 'shown');
    }
    addDomClassName(this.slideNav, this.current, 'selected');
};

FiveDaysSlider.prototype.initializeSliderElements = function() {
    this.current = 0;
    this.slidesArrayContainer = {
        daySlides: getElementsByQuery('.day-weather'),
        windSlides: getElementsByQuery('.day-wind'),
        precSlides: getElementsByQuery('.day-precepitation')
    };
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