/* eslint no-unused-vars: 0 */

// const slides = document.getElementsByClassName('day-weather');
// const slideNav = document.querySelectorAll('.day-switcher .menu-link');
// const next = document.getElementById('next-day');
// const prev = document.getElementById('prev-day');
// const current = 0;

// eslint-disable-next-line no-unused-vars
const slider = {
    next: document.getElementById('next-day'),
    prev: document.getElementById('prev-day'),

    initializeArrowEventListeners() {
        this.next.addEventListener('click', () => {
            this.nextSlide();
        });
        this.prev.addEventListener('click', () => {
            this.previousSlide();
        });
    },

    initializeSlider() {
        this.daySlides = document.getElementsByClassName('day-weather');
        this.windSlides = document.getElementsByClassName('day-wind');
        this.precSlides = document.getElementsByClassName('day-precepitation');
        this.slideNav = document.querySelectorAll('#day-switcher .menu-link');
        this.current = 0;

        for (let i = 0; i < this.slideNav.length; i++) {
            this.slideNav[i].addEventListener('click', () => {
                this.changeSlide(i);
            });
        }
    },

    changeSlide(index) {
        this.removeDomClassName(this.daySlides, this.current, 'shown');
        this.removeDomClassName(this.windSlides, this.current, 'shown');
        this.removeDomClassName(this.precSlides, this.current, 'shown');
        this.removeDomClassName(this.slideNav, this.current, 'selected');
        this.current = index;
        this.addDomClassName(this.daySlides, this.current, 'shown');
        this.addDomClassName(this.windSlides, this.current, 'shown');
        this.addDomClassName(this.precSlides, this.current, 'shown');
        this.addDomClassName(this.slideNav, this.current, 'selected');
    },

    nextSlide() {
        this.changeSlide((this.current + 1) % this.daySlides.length);
    },
    
    previousSlide() {
        (this.current !== 0) ? this.changeSlide(this.current - 1) : this.changeSlide(this.daySlides.length - 1);
    },

    addDomClassName(elementsArray, id, className) {
        elementsArray[id].classList.add(className);
    },

    removeDomClassName(elementsArray, id, className) {
        elementsArray[id].classList.remove(className);
    }
};

