import 'babel-polyfill'; // async-await needs this
import * as moment from 'moment';

// App Config
// TODO separate file
const ENV = process.env.NODE_ENV;
const BACKEND = 'http://ws.trier.hu';

// Bootstrap
// TODO separate file
class bootstrap {

	constructor() {
		
	}

}

// TODO Billboard class 
class index {

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
		let response = await fetch(BACKEND + '/get-timetable');
		let text = await response.text();
		return eval(text);
	}

	/**
	 * GetTimeTable callback for displaying timetable related elements.
	 */
	displayTimetableData() {
		this.nextbusDisplayEl.innerHTML = this.getCountdownStr();

		this.ribbonEl.classList.add('show');

		setInterval(() => {
			this.nextbusDisplayEl.innerHTML = this.getCountdownStr();
		}, 10000);
	}

	/**
	* Returns with the countdown string if we can expect a bus today. OR with  a sorry message.
	* @returns {string}
	*/
	getCountdownStr() {
		let nextbus = this.getNthBus(0);

		if (nextbus) {
			console.log(nextbus, 'nb');
			return moment.default().to(nextbus, true);
		}

		return 'No more buses today :(';		
	}

	/**
	 * Returns the 'Hurry up' string's time part if bus goes after the next bus (secondbus).
	 * @returns {string}
	 */
	getHurryStr() {
		let secondbus = this.getNthBus(1);

		if (secondbus) {
			return moment.default().to(secondbus, true);
		}

		return 'a lot';
	}

	/**
	 * Returns the nth bus from now in hh:mm format.
	 * @returns {string}
	 */
	getNthBus(i) {
		let busesFromNow = this.getBusesFromNow();

		if (busesFromNow) {
			return busesFromNow[i];
		}
		
		return false;
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

new bootstrap();
new index(); 