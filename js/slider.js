const graphs = document.querySelectorAll('.graph');
const buttons = document.querySelectorAll('.graph-controller .menu-link');
let currentGraphNumber = 0;

function changeGraph(index) {
    graphs[currentGraphNumber].classList.remove('shown');
    buttons[currentGraphNumber].classList.remove('selected');
    currentGraphNumber = index;
    graphs[currentGraphNumber].classList.add('shown');
    buttons[currentGraphNumber].classList.add('selected');
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        changeGraph(i);
    });
}
