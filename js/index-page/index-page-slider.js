const slider = {
    initSlider(slidesCssQuery, controlsCssQuery) {
        // this.slides = document.querySelectorAll('.graph');
        // this.controls = document.querySelectorAll('.graph-controller .menu-link');
        this.slides = document.querySelectorAll(slidesCssQuery);
        this.controls = document.querySelectorAll(controlsCssQuery);
        this.currentGraphNumber = 0;
        this.initListeners();
    },

    initListeners() {
        for (let i = 0; i < this.controls.length; i++) {
            this.controls[i].addEventListener('click', () => {
                this.changeGraph(i);
            });
        }
    },

    changeGraph(index) {
        this.slides[this.currentGraphNumber].classList.remove('shown');
        this.controls[this.currentGraphNumber].classList.remove('selected');
        this.currentGraphNumber = index;
        this.slides[this.currentGraphNumber].classList.add('shown');
        this.controls[this.currentGraphNumber].classList.add('selected');
    },
};