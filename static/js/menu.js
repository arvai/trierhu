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

        let menuTriggerEl = document.querySelector('#menu_trigger');
        let menuHeadEls   = this.menuEl.querySelectorAll('.head');

        menuTriggerEl.addEventListener('click', this.onMenuTriggerClick.bind(this), false);

        menuHeadEls.forEach(el => el.addEventListener('click', this.onHeadClick.bind(this), false));
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
        let target = $(ev.target).closest('li')
        // Manipulating classes with jq here, because it shorter than queryselectorall in case of multiple elements :(
        $(this.menuEl).find('li').removeClass('show');
        target.nextUntil('.head').addClass('show');
    }
}