import Bootstrap from './bootstrap';
import $ from 'jquery';

/**
 * 3rd Party Clock snipper
 */
export default class Clock {

	constructor() {
		this.clock();
	}

	/**
	 * Wrapper for 3rd party code.
	 */
	clock() {
		var clock = {

			digits : ["zero", "one", "two", "three", "foure", "five", "six", "seven", "eight", "nine"],

			init : function(){
				var $digit = $('.digit');

				this.hour = [$($digit[0]), $($digit[1])];
				this.min  = [$($digit[2]), $($digit[3])];
				this.sec  = [$($digit[4]), $($digit[5])];


				this.drawInterval(this.drawSecond, function(time){
					return 1000 - time[3];
				})

				this.drawInterval(this.drawMinute, function(time){
					return 60000 - time[2] * 1000 - time[3];
				})


				this.drawInterval(this.drawHour, function(time){
					return (60 - time[1]) * 60000 - time[2] * 1000 - time[3];
				})

			},

			getTimeArray : function(){
				var dat = new Date();
				return [dat.getHours(), dat.getMinutes(), dat.getSeconds(), dat.getMilliseconds()];
			},

			drawInterval : function(func, timeCallback){
				var time = this.getTimeArray();

				func.call(this, time);

				var that = this;
				setTimeout(function(){
					that.drawInterval(func, timeCallback);
				}, timeCallback(time));
			},

			drawHour : function(time){
				this.drawDigits(this.hour, time[0]);
			},

			drawMinute : function(time){
				this.drawDigits(this.min,  time[1]);
			},

			drawSecond : function(time){
				this.drawDigits(this.sec,  time[2]);
			},

			drawDigits : function(digits, digit){
				var ten = Math.floor(digit / 10);
				var one = Math.floor(digit % 10);

				digits[0].attr('class', 'digit '+this.digits[ten]);
				digits[1].attr('class', 'digit '+this.digits[one]);
			}

		};

		clock.init();
	}

}