import * as moment from 'moment';

const TIMETABLE = [
	'08:21',
	'09:21',
	'10:21',
	'11:21',
	'12:21',
	'13:21',
	'14:21',
	'15:21',
	'16:21',
	'16:36',
	'16:51',
	'17:06',
	'17:21',
	'17:31',
	'17:41',
	'17:51',
	'17:56',
	'18:01',
	'18:11',
	'18:21',
	'18:36',
	'18:51',
	'19:21',
	'19:51',
	'20:21',
	'21:21',
	'22:21',
];

class index {

	/**
	* Constructor
	*/
	constructor() {
		let displayEl    = document.querySelector('.ribbon p');

		displayEl.innerHTML = this.getCountdownStr();

		setInterval(() => {
			displayEl.innerHTML = this.getCountdownStr();
		}, 10000);
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

		return 'No more bus\' today :(';		
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

new index(); 