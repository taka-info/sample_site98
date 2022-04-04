document.addEventListener("DOMContentLoaded", function() {

    const main = new Main();
    
});

class Main {
    constructor(){
        this.targetMap = {};
        this.targetMap.textAnimation = new Map();
        this.header = document.querySelector('.header');
        this.sides = document.querySelectorAll('.side'); 
        this._observers = [];
        this._init();
    }
    set observers(val) {
        this._observers.push(val);
    }
    get observers() {
        return this._observers;
    }
    _init() {
        new MobileMenu();
        this.hero = new HeroSlider('.swiper');
        Pace.on('done', this._scrollInit.bind(this));
    }
    _headerAnimation(el,boolean) {
        if(boolean) {
            this.header.classList.remove('triggered');
        } else {
            this.header.classList.add('triggered');
        }
    }
    _toggleSwiper(el,boolean) {
        if(boolean) {
            this.hero.starts();
        } else {
            this.hero.stop();
        }
    }
    _inviewAnimation(el, boolean) {
        if(boolean) {
            el.classList.add('inview');
        } else {
            el.classList.remove('inview');
        }
    }
    _textAnimation(el, boolean) {
        if(!this.targetMap.textAnimation.get(el)) {
            this.targetMap.textAnimation.set(el, (new TweenTextAnimation(el)))
        }
        const trigger = this.targetMap.textAnimation.get(el);
        trigger._animation( boolean ? true : false);
        // boolean ? el.classList.add('inview') : el.classList.remove('inview');
    }
    _sideAnimation(el, boolean) {
        this.sides.forEach(side=>{
            boolean ? side.classList.add('inview') : side.classList.remove('inview');
        });
    }
    _scrollInit() {
        this.observers = new scrollObserver('.nav-scroll-trigger', this._headerAnimation.bind(this), {once: false});
        this.observers = new scrollObserver('.swiper', this._toggleSwiper.bind(this), {once: false});
        this.observers = new scrollObserver(['.cover-slide','.appear'], this._inviewAnimation);
        this.observers = new scrollObserver('.tween-animate-title', this._textAnimation.bind(this));
        this.observers = new scrollObserver('.tween-animate-title_infinite', this._textAnimation.bind(this), {once: false});
        this.observers = new scrollObserver('#main-content', this._sideAnimation.bind(this), {once: false, rootMargin: "-300px 0px"});
    }
}