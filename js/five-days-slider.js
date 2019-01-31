const slides = document.getElementsByClassName('day-weather');
const slideNav = document.querySelectorAll('.day-switcher .menu-link');
const next = document.getElementById('next-day');
const prev = document.getElementById('prev-day');
let current = 0;

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

  reinitializeSlider() {
    this.slides = document.getElementsByClassName('day-weather');
    this.slideNav = document.querySelectorAll('#day-switcher .menu-link');
    this.current = 0;

    for (let i = 0; i < this.slideNav.length; i++) {
      this.slideNav[i].addEventListener('click', () => {
        this.changeSlide(i);
      });
    }
  },
  changeSlide(index) {
    this.slides[this.current].classList.remove('shown');
    console.log(this.slides[this.current].classList);
    this.slideNav[this.current].classList.remove('selected');
    this.current = index;
    this.slides[this.current].classList.add('shown');
    this.slideNav[this.current].classList.add('selected');
  },
  nextSlide() {
    this.changeSlide((this.current + 1) % this.slides.length);
  },
  previousSlide() {
    (this.current !== 0) ? this.changeSlide(this.current - 1) : this.changeSlide(this.slides.length - 1);
  }
}