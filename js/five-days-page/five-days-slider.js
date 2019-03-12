
class FiveDaysSlider {
    constructor() {
        this.next = document.getElementById('next-day');
        this.prev = document.getElementById('prev-day');
        this.initializeArrowEventListeners();
    }
    nextSlide() {
        this.changeSlide((this.current + 1) % this.slidesArrayContainer.daySlides.length);
    }
    previousSlide() {
        (this.current !== 0) ? this.changeSlide(this.current - 1) : this.changeSlide(this.slidesArrayContainer.daySlides.length - 1);
    }
    changeSlide(index) {
        removeDomClassName(this.slideNav, this.current, 'selected');
        for (let slidesType in this.slidesArrayContainer) {
            removeDomClassName(this.slidesArrayContainer[slidesType], this.current, 'shown');
        }
        this.current = index;
        for (let slidesType in this.slidesArrayContainer) {
            addDomClassName(this.slidesArrayContainer[slidesType], this.current, 'shown');
        }
        addDomClassName(this.slideNav, this.current, 'selected');
    }
    initializeSliderElements() {
        this.current = 0;
        this.slidesArrayContainer = {
            daySlides: getElementsByQuery('.day-weather'),
            windSlides: getElementsByQuery('.day-wind'),
            precSlides: getElementsByQuery('.day-precepitation')
        };
        this.slideNav = getElementsByQuery('.day-switcher .menu-link');
        this.initializeSlideNavListeners();
    }
    initializeArrowEventListeners() {
        this.next.addEventListener('click', () => {
            this.nextSlide();
        });
        this.prev.addEventListener('click', () => {
            this.previousSlide();
        });
    }
    initializeSlideNavListeners() {
        for (let i = 0; i < this.slideNav.length; i++) {
            this.slideNav[i].addEventListener('click', () => {
                this.changeSlide(i);
            });
        }
    }
}


