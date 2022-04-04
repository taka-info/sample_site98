// const target = document.querySelector('.nav-scroll-trigger');
// const trigger = document.querySelector('.header');
// const cb = function(entries, observer) {
//     entries.forEach(entry => {
//         if(entry.isIntersecting) {
//             trigger.classList.remove('triggered');
//             // observer.unobserve(entry.target);
//         } else {
//             trigger.classList.add('triggered');
//         }
//     })
// }
// const options = {
//     root: null,
//     rootMargin: "0px",
//     threshold: 0
// }

// const ob = new IntersectionObserver(cb,options);
// ob.observe(target);

class scrollObserver {
    constructor(els , cb, options) {
        this.els = this._elsSet(els);
        this.cb = cb;
        const defaultOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0,
            once: true
        }
        this.options = Object.assign(defaultOptions, options);
        this.once = this.options.once;
        this._init();
    }
    _elsSet(els) {
        if(els instanceof Array){
            let elsSet = new Set();
            let arrayEl = [];
            els.forEach(el => {
                if(!elsSet.has(el)){
                    elsSet.add(el);
                }
                elsSet.forEach(el=>{
                    const domEl = document.querySelectorAll(el);
                    arrayEl.push(domEl);
                });
            });
            return arrayEl;
        } else {
            return document.querySelectorAll(els);
        }
        
    }
    _init() {
        const callback = function(entries, observe) {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    this.cb(entry.target, true);
                    if(this.once) {
                        observe.unobserve(entry.target);
                    }
                } else {
                    this.cb(entry.target, false);
                }
            })
        }
        this.ob = new IntersectionObserver(callback.bind(this), this.options);
        this.ob.POLL_INTERVAL = 100;

        if(this.els instanceof Array){
            this.els.forEach(array=>{
                array.forEach(el=>{
                    this.ob.observe(el);
                });
            });
        } else {
            this.els.forEach(el => {
                this.ob.observe(el);
            })   
        }
    }
}