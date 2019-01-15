let graphs = document.querySelectorAll(".graph");
let buttons = document.querySelectorAll('.graph-controller .menu-link');
current = 0;

function changeGraph(index) {
    graphs[current].className = graphs[current].className.substring(0, graphs[current].className.length - 6);
    buttons[current].className = buttons[current].className.substring(0, buttons[current].className.length - 9);
    current = index;
    graphs[current].className += ' shown';
    buttons[current].className += ' selected';
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        changeGraph(i);
    });
}