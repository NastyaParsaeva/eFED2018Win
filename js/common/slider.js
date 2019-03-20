class Slider {

    initSlider() {
        this.slides = Utils.getElementsByQuery('.graph');
        this.slideNav = Utils.getElementsByQuery('.graph-controller .menu-link');
        this.current = 0;
        this.initializeSlideNavListeners();
    }

    initializeSlideNavListeners() {
        for (let i = 0; i < this.slideNav.length; i++) {
            this.slideNav[i].addEventListener('click', () => {
                this.changeSlide(i);
            });
        }
    }
    
    changeSlide(index) {
        Utils.removeDomClassName(this.slides, this.current, 'shown');
        Utils.removeDomClassName(this.slideNav, this.current, 'selected');
        this.current = index;
        Utils.addDomClassName(this.slides, this.current, 'shown');
        Utils.addDomClassName(this.slideNav, this.current, 'selected');
    }
}



