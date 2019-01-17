const graphs = document.querySelectorAll(".graph");
const buttons = document.querySelectorAll('.graph-controller .menu-link');
let current = 0;

function changeGraph(index) {
    graphs[current].classList.remove('shown');
    buttons[current].classList.remove('selected');
    current = index;
    graphs[current].classList.add('shown');
    buttons[current].classList.add('selected');
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        changeGraph(i);
    });
}