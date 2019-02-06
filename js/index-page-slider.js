const slider = {
    initSlider() {
        this.graphs = document.querySelectorAll('.graph');
        this.buttons = document.querySelectorAll('.graph-controller .menu-link');
        this.currentGraphNumber = 0;
        this.initListeners();
    },

    initListeners() {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].addEventListener('click', () => {
                this.changeGraph(i);
            });
        }
    },

    changeGraph(index) {
        this.graphs[this.currentGraphNumber].classList.remove('shown');
        this.buttons[this.currentGraphNumber].classList.remove('selected');
        this.currentGraphNumber = index;
        this.graphs[this.currentGraphNumber].classList.add('shown');
        this.buttons[this.currentGraphNumber].classList.add('selected');
    },
};