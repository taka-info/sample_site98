class TweenTextAnimation {
    constructor(el) {
        this.DOM = {};
        this.DOM.el = el instanceof HTMLElement ? el : document.querySelector(el);
        this.chars = this.DOM.el.innerHTML.trim().split("");
        this.DOM.el.innerHTML = this._splitText();
        this.DOM.chars = this.DOM.el.querySelectorAll('.char');
    }
    _splitText() {
        return this.chars.reduce((accu, curr)=>{
            curr = curr.replace(/\s+/, '&nbsp;');
            return `${accu}<span class="char">${curr}</span>`;
        },"");
    }
    _animation(boolean = false) {
        if(boolean) {
            // this.DOM.el.classList.add('inview');
            this.DOM.chars.forEach((v,i) => {
                TweenMax.to(v, .6,{
                    ease: Back.easeOut,
                    delay: i * .05,
                    startAt: {y: '-50%', opacity: 0},
                    y: '0%',
                    opacity: 1
                });
                
            });
        } else {
            // this.DOM.el.classList.remove('inview');
            this.DOM.chars.forEach((v) => {
                TweenMax.to(v, 0,{
                    y: '-50%',
                    opacity: 0
                })
            });
        }
    }
}