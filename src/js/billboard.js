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
		this.ribbonEl            = document.querySelector('.ribbon');
		this.nextbusDisplayEl    = document.querySelector('.ribbon p');
		this.hurryDisplayEl      = document.querySelector('.ribbon p:last-child span');

		this.getTimeTable().then(timetable => {
			this.timetable = timetable;
			this.displayTimetableData();
		});
	}

	/**
	* Timetable comes from the ServerApp.
	* @returns {Array} Array with the daily bus schedule. Time format: 12:45
	*/
	async getTimeTable() {
		// TODO test 404,etc.
		let response = await fetch(bootstrap.config.BACKEND + '/get-timetable');
		let text = await response.text();
		return eval(text);
	}

	/**
	 * GetTimeTable callback for displaying timetable related elements.
	 */
	displayTimetableData() {

		let showNextbus = () => {
			this.refreshBusesFromNow();
			this.nextbusDisplayEl.innerHTML = this.getNextbusStr();
			this.hurryDisplayEl.innerHTML = this.getHurryStr();
		}

		showNextbus();
		setInterval(() => showNextbus(), 10000);

		this.ribbonEl.classList.add('show');
	}

	/**
	* Returns with the countdown string if we can expect a bus today. OR with  a sorry message.
	* @returns {string}
	*/
	getNextbusStr() {
		let nextbus = this.getNthBus(0);

		if (nextbus) {
			return moment.default().to(nextbus, true);
		}

		return 'No more buses today :(';		
	}

	/**
	 * Returns the 'Hurry up' string's time part if bus goes after the next bus (secondbus).
	 * @returns {string}
	 */
	getHurryStr() {
		let firstbus  = this.getNthBus(0);
		let secondbus = this.getNthBus(1);

		if (firstbus && secondbus) {
			return moment.default(firstbus).to(secondbus, true);
		}

		return 'a lot';
	}

	/**
	 * Returns the nth bus from now in hh:mm format.
	 * @returns {moment}
	 */
	getNthBus(i) {
		if (this.busesFromNow && this.busesFromNow[i]) {
			let timeObj = moment.default(this.busesFromNow[i], 'hh:mm');
			return timeObj;
		}
		return false;
	}

	/**
	 *
	 */
	refreshBusesFromNow() {
		this.busesFromNow = this.getBusesFromNow();
	}

	/**
	* Looks for all the bus starts from now, by iterating over the timetable.
	* @TODO Should be processed by the ServerApp
	* @returns {Array|False} Buses start from now today. If no more buses today, then FALSE.
	*/
	getBusesFromNow() {
		for (let index in this.timetable) {
			// Check is timetable item is after now. If yes, that will be the next bus.
			let busStart = moment.default(this.timetable[index], 'hh:mm');
			let isAfter = busStart.isAfter();

			if (isAfter) {
				return this.timetable.slice(index);	
			}
		}

		return false;
	}

}