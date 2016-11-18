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
    }

    open() {
        this.overlayEl.classList.add('show');
        this.bodyEl.classList.add('overlay-opened');
    }

    toggle() {
        this.overlayEl.classList.toggle('show');
        this.bodyEl.classList.toggle('overlay-opened');
    }

    onOverlayClick() {
        this.close();
    }

}