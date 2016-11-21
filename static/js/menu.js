import Bootstrap from './bootstrap';
import Overlay from './overlay';
import $ from 'jquery';

/**
 * Menu handler class.
 */
export default class Menu extends Overlay {
    constructor() {
        super();
        this.menuEl = document.querySelector('nav');
        this.menuHeadEls   = this.menuEl.querySelectorAll('.head');

        let menuTriggerEl = document.querySelector('#menu_trigger');
        menuTriggerEl.addEventListener('click', this.onMenuTriggerClick.bind(this), false);

        // Later polyfill it
        Array.prototype.slice.call(this.menuHeadEls).forEach(el => el.addEventListener('click', this.onHeadClick.bind(this), false));
    }

    onMenuTriggerClick() {
        this.toggle();
        this.menuEl.classList.toggle('open');
    }

    onOverlayClick() {
        super.onOverlayClick();
        this.menuEl.classList.remove('open');
    }

    onHeadClick(ev) {
        let target = $(ev.target).closest('li')[0];
        Array.prototype.slice.call(this.menuHeadEls).forEach(el => el.classList.remove('show'));
        target.classList.add('show');
    }
}