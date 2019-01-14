/*this.window.onload = function() {
  window.document.getElementById("mainInfo").innerHTML = JSON.stringify(
    weekForecastMock
  );
};*/

let slides = document.getElementsByClassName('day-weather');
let current = 0;
let slideNav = document.querySelectorAll('.day-switcher .menu-link');

console.log(slideNav);
 
function nextSlide() {
    slides[current].className = 'day-weather';
    slideNav[current].className = 'menu-link';
    current = (current + 1) % slides.length;
    slides[current].className = 'day-weather shown';
    slideNav[current].className = 'menu-link selected';
}


function previousSlide() {
    slides[current].className = 'day-weather';
    slideNav[current].className = 'menu-link';
    current--;
    if (current === -1) {
      current = slides.length-1;
    }
    slides[current].className = 'day-weather shown';
    slideNav[current].className = 'menu-link selected';
}

let next = document.getElementById('next-day');
next.addEventListener('click', nextSlide);

let prev = document.getElementById('prev-day');
prev.addEventListener('click', previousSlide);

for (let i = 0; i < slideNav.length; i++) {
  slideNav[i].addEventListener('click', () => {
    slides[current].className = 'day-weather';
    slideNav[current].className = 'menu-link';
    current = i;
    slides[current].className = 'day-weather shown';
    slideNav[current].className = 'menu-link selected';
  });
}