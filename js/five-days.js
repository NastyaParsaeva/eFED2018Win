const slides = document.getElementsByClassName('day-weather');
const slideNav = document.querySelectorAll('.day-switcher .menu-link');
const next = document.getElementById('next-day');
const prev = document.getElementById('prev-day');
let current = 0;

const slider = {

  next: document.getElementById('next-day'),
  prev: document.getElementById('prev-day'),

  initializeSlider() {
    this.slides = document.getElementsByClassName('day-weather');
    this.slideNav = document.querySelectorAll('#day-switcher .menu-link');
    this.current = 0;
    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', previousSlide);
    for (let i = 0; i < slideNav.length; i++) {
      this.slideNav[i].addEventListener('click', () => {
        this.changeSlide(i);
      });
}
  },
  changeSlide(index) {
    this.slides[this.current].classList.remove('shown');
    tihs.slideNav[this.current].classList.remove('selected');
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


 
function nextSlide() {
  changeSlide((current + 1) % slides.length);
}

function previousSlide() {
  (current !== 0) ? changeSlide(current - 1) : changeSlide(slides.length - 1);
}

next.addEventListener('click', nextSlide);
prev.addEventListener('click', previousSlide);
for (let i = 0; i < slideNav.length; i++) {
  slideNav[i].addEventListener('click', () => {
    changeSlide(i);
  });
}