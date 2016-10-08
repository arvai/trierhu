import Bootstrap from './bootstrap';
import * as moment from 'moment';

const bootstrap = new Bootstrap();

/**
 * Billboard handler class.
 * 'The next bus goes to Trier in...' project
 */ 
export default class Billboard {

	/**
	* Constructor
	*/
	constructor() {
		this.BILLBOARD_REFRESH_INTERVAL = 2000;

		this.next  =  bootstrap.config.next;
		this.after = bootstrap.config.after;

		this.ribbonEl            = document.querySelector('.ribbon');
		this.nextbusDisplayEl    = document.querySelector('.ribbon p');
		this.afterDisplayEl      = document.querySelector('.ribbon p:last-child span');

		moment.locale(window.lang.langCode);

		this.fillTimeContainers();
		this.startRefreshInterval();
	}

	/**
	 * Fills the DOM time containers with its content.
	 */
	fillTimeContainers() {
		this.nextbusDisplayEl.innerHTML = this.getNextbusStr();
		this.afterDisplayEl.innerHTML   = this.getAfterStr();
	}

	/**
	* Returns with the countdown string if we can expect a bus today. OR with  a sorry message.
	* @returns {string}
	*/
	getNextbusStr() {
		if (this.next > -1) {
			let nextStr = moment.duration({ seconds: this.next }).humanize(true);
			return nextStr;
		}

		return window.lang.no_more_buses_today;
	}

	/**
	 * Returns the 'Hurry up' string's time part if bus goes after the next bus (secondbus).
	 * @returns {string}
	 */
	getAfterStr() {
		if (this.after > -1) {
			let afterStr = moment.duration({ seconds: this.after }).humanize(false);
			return afterStr;
		}

		return window.lang.billboard.a_lot;
	}

	/**
	 * Fetches next and after times
	 * @returns {Promise}
	 */
	async fetchTimes() {
		let response = await fetch(bootstrap.config.BACKEND + '/getData.php?xhr');
		var data = await response.json();

		if (response.ok) {
			this.after = data.after;
			this.next  = data.next;
			console.log(this.after, this.next);
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