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
		let displayEl    = document.querySelector('.ribbon p');

		this.getTimeTable().then(timetable => {
			displayEl.innerHTML = this.getCountdownStr();

			setInterval(() => {
				displayEl.innerHTML = this.getCountdownStr();
			}, 10000);
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
	* Returns with the countdown string if we can expect a bus today. OR with  a sorry message.
	* @returns (string)
	*/
	getCountdownStr() {
		let nextbus = this.getNextBus();

		if (nextbus) {
			return moment.default().to(nextbus);
		}

		return 'No more buses today :(';		
	}

	/**
	* Looks for the next bus, by iterating over the timetable.
	* @TODO Should be processed by the ServerApp
	* @returns (moment|bool) The next bus' start time today. If no more buses today, then FALSE.
	*/
	getNextBus() {
		for (let item in this.timetable) {
			// Check is timetable item is after now. If yes, that will be the next bus.
			let busStart = moment.default(this.timetable[item], 'hh:mm');
			let isAfter = busStart.isAfter();

			if (isAfter) {
				return busStart;	
			}
		}

		return false;
	}
}

new bootstrap();
new index(); 