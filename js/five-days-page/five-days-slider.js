
function FiveDaysSlider() {
    this.next = document.getElementById('next-day');
    this.prev = document.getElementById('prev-day');
    this.initializeArrowEventListeners();
    this.initializeSlider();
}

FiveDaysSlider.prototype = Object.create(Slider.prototype);

FiveDaysSlider.prototype.nextSlide = function() {
    this.changeSlide((this.current + 1) % this.daySlides.length);
},

FiveDaysSlider.prototype.previousSlide = function() {
    (this.current !== 0) ? this.changeSlide(this.current - 1) : this.changeSlide(this.daySlides.length - 1);
},

FiveDaysSlider.prototype.changeSlide = function(index) {
    console.log(`changeSlide ${this.slideNav}`);
    this.removeDomClassName(this.daySlides, this.current, 'shown');
    this.removeDomClassName(this.windSlides, this.current, 'shown');
    this.removeDomClassName(this.precSlides, this.current, 'shown');
    this.removeDomClassName(this.slideNav, this.current, 'selected');
    this.current = index;
    this.addDomClassName(this.daySlides, this.current, 'shown');
    this.addDomClassName(this.windSlides, this.current, 'shown');
    this.addDomClassName(this.precSlides, this.current, 'shown');
    this.addDomClassName(this.slideNav, this.current, 'selected');
};
FiveDaysSlider.prototype.initializeSlider = function() {
    console.log('initializeSlider');
    this.daySlides = document.getElementsByClassName('day-weather');
    console.log(this.daySlides);
    this.windSlides = document.getElementsByClassName('day-wind');
    this.precSlides = document.getElementsByClassName('day-precepitation');
    this.slideNav = document.getElementById('day-switcher').getElementsByClassName('menu-link');
    console.log(this.slideNav);
    this.current = 0;
    this.initializeSlideNavListeners();
};

FiveDaysSlider.prototype.initializeSlideNavListeners = function() {
    for (let i = 0; i < this.slideNav.length; i++) {
        console.log(`slideNav[i] ${slideNav[i]}`);
        this.slideNav[i].addEventListener('click', () => {
            this.changeSlide(i);
        });
    }
};

FiveDaysSlider.prototype.initializeArrowEventListeners = function() {
    this.next.addEventListener('click', () => {
        this.nextSlide();
    });
    this.prev.addEventListener('click', () => {
        this.previousSlide();
    });
};

// const slider = {
//     next: document.getElementById('next-day'),
//     prev: document.getElementById('prev-day'),

//     initializeArrowEventListeners() {
//         this.next.addEventListener('click', () => {
//             this.nextSlide();
//         });
//         this.prev.addEventListener('click', () => {
//             this.previousSlide();
//         });
//     },

//     initializeSlider() {
//         this.daySlides = document.getElementsByClassName('day-weather');
//         this.windSlides = document.getElementsByClassName('day-wind');
//         this.precSlides = document.getElementsByClassName('day-precepitation');
//         this.slideNav = document.querySelectorAll('#day-switcher .menu-link');
//         this.current = 0;

//         for (let i = 0; i < this.slideNav.length; i++) {
//             this.slideNav[i].addEventListener('click', () => {
//                 this.changeSlide(i);
//             });
//         }
//     },

//     changeSlide(index) {
//         this.removeDomClassName(this.daySlides, this.current, 'shown');
//         this.removeDomClassName(this.windSlides, this.current, 'shown');
//         this.removeDomClassName(this.precSlides, this.current, 'shown');
//         this.removeDomClassName(this.slideNav, this.current, 'selected');
//         this.current = index;
//         this.addDomClassName(this.daySlides, this.current, 'shown');
//         this.addDomClassName(this.windSlides, this.current, 'shown');
//         this.addDomClassName(this.precSlides, this.current, 'shown');
//         this.addDomClassName(this.slideNav, this.current, 'selected');
//     },

//     nextSlide() {
//         this.changeSlide((this.current + 1) % this.daySlides.length);
//     },
    
//     previousSlide() {
//         (this.current !== 0) ? this.changeSlide(this.current - 1) : this.changeSlide(this.daySlides.length - 1);
//     },

//     addDomClassName(elementsArray, id, className) {
//         elementsArray[id].classList.add(className);
//     },

//     removeDomClassName(elementsArray, id, className) {
//         elementsArray[id].classList.remove(className);
//     }
// };

