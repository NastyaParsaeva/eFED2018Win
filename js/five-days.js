
let slides = document.getElementsByClassName('day-weather');
let current = 0;
let slideNav = document.querySelectorAll('.day-switcher .menu-link');

function changeSlide(index) {
  console.log(index);
    slides[current].className = 'day-weather';
    slideNav[current].className = 'menu-link';
    current = index;
    slides[current].className = 'day-weather shown';
    slideNav[current].className = 'menu-link selected';
}
 
function nextSlide() {
  changeSlide((current + 1) % slides.length);
}

function previousSlide() {
  (current !== 0) ? changeSlide(current - 1) : changeSlide(slides.length - 1);
}

let next = document.getElementById('next-day');
next.addEventListener('click', nextSlide);

let prev = document.getElementById('prev-day');
prev.addEventListener('click', previousSlide);

for (let i = 0; i < slideNav.length; i++) {
  slideNav[i].addEventListener('click', () => {
    changeSlide(i);
  });
}