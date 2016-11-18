import Bootstrap from './bootstrap';
import * as moment from 'moment';
import sweetalert from 'sweetalert';
import isMobile from 'ismobilejs';
import * as slick from 'slick-carousel';
import $ from 'jquery';

/**
 * Billboard handler class.
 * 'The next bus goes to Trier in...' project
 */
export default class Billboard {

	/**
	* Constructor
	*/
	constructor() {
		this.BILLBOARD_REFRESH_INTERVAL = 10000;

		this.next  = Bootstrap.config().next;
		this.after = Bootstrap.config().after;

		this.ribbonEl            = document.querySelector('.ribbon');
		this.nextbusDisplayEl    = document.querySelector('.ribbon p');
		this.afterDisplayEl      = document.querySelector('.ribbon p:last-child span');

		moment.locale(window.locale);

		this.fillTimeContainers();
		this.startRefreshInterval();
		this.alertHomeScreen();
        this.initSlick();
	}

	initSlick() {
	     $('.whatsnew').slick({
             arrows: false,
             centerMode: true,
             variableWidth: true,
             centerPadding: '60px',
             slidesToShow: 3,
             responsive: [
                 {
                     breakpoint: 768,
                     settings: {
                         arrows: false,
                         centerMode: true,
                         centerPadding: '40px',
                         slidesToShow: 3
                     }
                 },
                 {
                     breakpoint: 480,
                     settings: {
                         arrows: false,
                         centerMode: true,
                         centerPadding: '40px',
                         slidesToShow: 1
                     }
                 }
             ]
         });
    }

	/**
	 * Overlay for raise attention to the 'Add homescreen' function
	 */
	alertHomeScreen() {
		let alreadyShowed = Bootstrap.getCookie('homeScreen');
		if ( isMobile.any && !Boolean(alreadyShowed) ) {
			Bootstrap.createCookie('homeScreen', 'true');
			//@TODO lang later
			sweetalert("Did you know?", "You can add the application to your home screen!", "info");
		}
	}

	/**
	 * Fills the DOM time containers with its content.
	 */
	fillTimeContainers() {
		// Add favicon badge
		if (this.next > 90) {
			let favicon = new Favico({
				animation:'fade'
			});

			let num = moment.duration({ seconds: this.next }).asMinutes();

			favicon.badge(num);
		}

		this.nextbusDisplayEl.innerHTML = this.getNextbusStr();
		this.afterDisplayEl.innerHTML   = this.getAfterStr();
	}

	/**
	* Returns with the countdown string if we can expect a bus today. OR with  a sorry message.
	* @returns {string}
	*/
	getNextbusStr() {
		if (this.next > -1) {
			return moment.duration({ seconds: this.next }).humanize(true);
		}

		return window.translation.no_more_buses_today;
	}

	/**
	 * Returns the 'Hurry up' string's time part if bus goes after the next bus (secondbus).
	 * @returns {string}
	 */
	getAfterStr() {
		if (this.after > -1) {
			return moment.duration({ seconds: this.after }).humanize(false);
		}

		return window.translation["billboard.a_lot"];
	}

	/**
	 * Fetches next and after times
	 * @returns {Promise}
	 */
	async fetchTimes() {
		let response = await fetch(Bootstrap.config().HOST + '/refresh');
		var data = await response.json();

		if (response.ok) {
			this.after = data.after;
			this.next  = data.next;
		}
	}

	/**
	 * Starts a timer to fetch time data, and fill the containers.
	 * Calls itself if successful.
	 * @returns {void}
	 */
	startRefreshInterval() {
		setTimeout(() => {
			this.fetchTimes()
				.then(() => {
					this.fillTimeContainers();
					this.startRefreshInterval();
				})
		}, this.BILLBOARD_REFRESH_INTERVAL);
	}
}