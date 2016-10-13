/**
 * Bootstrap for providing system-wide variables and functions.
 */
export default class bootstrap {

	constructor() {
		// App Config
		this.config = window.config;
		this.config.ENV = process.env.NODE_ENV;
	}
}