/**
 * Bootstrap for providing system-wide variables and functions.
 */
export default class bootstrap {

	constructor() {
		// App Config
		this.config = {};
		this.config.ENV = process.env.NODE_ENV;
		this.config.BACKEND = 'http://ws.trier.hu';
	}
}