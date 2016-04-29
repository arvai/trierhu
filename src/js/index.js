import * as moment from 'moment';

// App Config
// TODO separate file
const ENV = process.env.NODE_ENV;

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

		this.getTimeTable();

		displayEl.innerHTML = this.getCountdownStr();

		setInterval(() => {
			displayEl.innerHTML = this.getCountdownStr();
		}, 10000);
	}

	getTimeTable() {
		console.log('alive');
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
	* @returns (moment|bool) The next bus' start time today. If no more buses today, then FALSE.
	*/
	getNextBus() {
		for (let item in TIMETABLE) {
			// Check is timetable item is after now. If yes, that will be the next bus.
			let busStart = moment.default(TIMETABLE[item], 'hh:mm');
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