import Bootstrap from './bootstrap';
import $ from 'jquery';

/**
 * Menu handler class.
 */
export default class Overlay {
    constructor() {
        this.overlayEl = document.querySelector('.overlay');
        this.bodyEl = document.querySelector('body');
        this.overlayEl.addEventListener('click', this.onOverlayClick.bind(this), false);
    }

    close() {
        this.overlayEl.classList.remove('show');
        this.bodyEl.classList.remove('overlay-opened');
        //this.bodyEl.style.overflow = 'visible';
    }

    open() {
        this.overlayEl.classList.add('show');
        this.bodyEl.classList.add('overlay-opened');
        //this.bodyEl.style.overflow = 'hidden';
    }

    toggle() {
        if (this.bodyEl.classList.contains('overlay-opened')) {
            this.close();
        }
        else {
            this.open();
        }
    }

    onOverlayClick() {
        this.close();
    }

}