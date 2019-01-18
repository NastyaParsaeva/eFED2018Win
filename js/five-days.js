
const slides = document.getElementsByClassName('day-weather');
const slideNav = document.querySelectorAll('.day-switcher .menu-link');
const next = document.getElementById('next-day');
const prev = document.getElementById('prev-day');
let current = 0;

function changeSlide(index) {
    slides[current].classList.remove('shown');
    slideNav[current].classList.remove('selected');
    current = index;
    slides[current].classList.add('shown');
    slideNav[current].classList.add('selected');
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