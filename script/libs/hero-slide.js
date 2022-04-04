class HeroSlider {
    constructor(el) {
        this.el = el;
        this.swiper = this._initSwiper();
    }

    _initSwiper() {
        return new Swiper(this.el, {
            direction: 'horizontal',
            loop: true,
            speed: 1000,
            slidesPerView: 1,
            centeredSlides: true,
            grabCursor: true,
            effect: 'coverflow',
            breakpoints: {
                1024: {
                    slidesPerView: 2
                }
            }
        });
    }

    starts(option = {}) {
        let options = Object.assign({
                delay: 4000,
                disableOnInteraction: false
            }, option);
        
        this.swiper.params.autoplay = options;
        this.swiper.autoplay.start();
    }

    stop() {
        this.swiper.autoplay.stop();
    }
};