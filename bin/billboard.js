'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _bootstrap = require('./bootstrap');

var _bootstrap2 = _interopRequireDefault(_bootstrap);

var _moment = require('moment');

var moment = _interopRequireWildcard(_moment);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bootstrap = new _bootstrap2.default();

/**
 * Billboard handler class.
 * 'The next bus goes to Trier in...' project
 */

var Billboard = function () {

	/**
 * Constructor
 */

	function Billboard() {
		var _this = this;

		(0, _classCallCheck3.default)(this, Billboard);

		this.ribbonEl = document.querySelector('.ribbon');
		this.nextbusDisplayEl = document.querySelector('.ribbon p');
		this.hurryDisplayEl = document.querySelector('.ribbon p:last-child span');

		this.getTimeTable().then(function (timetable) {
			_this.timetable = timetable;
			_this.displayTimetableData();
		});
	}

	/**
 * Timetable comes from the ServerApp.
 * @returns {Array} Array with the daily bus schedule. Time format: 12:45
 */


	(0, _createClass3.default)(Billboard, [{
		key: 'getTimeTable',
		value: function getTimeTable() {
			var response, text;
			return _regenerator2.default.async(function getTimeTable$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return _regenerator2.default.awrap(fetch(bootstrap.config.BACKEND + '/get-timetable'));

						case 2:
							response = _context.sent;
							_context.next = 5;
							return _regenerator2.default.awrap(response.text());

						case 5:
							text = _context.sent;
							return _context.abrupt('return', eval(text));

						case 7:
						case 'end':
							return _context.stop();
					}
				}
			}, null, this);
		}

		/**
   * GetTimeTable callback for displaying timetable related elements.
   */

	}, {
		key: 'displayTimetableData',
		value: function displayTimetableData() {
			var _this2 = this;

			var showNextbus = function showNextbus() {
				_this2.refreshBusesFromNow();
				_this2.nextbusDisplayEl.innerHTML = _this2.getNextbusStr();
				_this2.hurryDisplayEl.innerHTML = _this2.getHurryStr();
			};

			showNextbus();
			setInterval(function () {
				return showNextbus();
			}, 10000);

			this.ribbonEl.classList.add('show');
		}

		/**
  * Returns with the countdown string if we can expect a bus today. OR with  a sorry message.
  * @returns {string}
  */

	}, {
		key: 'getNextbusStr',
		value: function getNextbusStr() {
			var nextbus = this.getNthBus(0);

			if (nextbus) {
				return moment.default().to(nextbus, true);
			}

			return 'No more buses today :(';
		}

		/**
   * Returns the 'Hurry up' string's time part if bus goes after the next bus (secondbus).
   * @returns {string}
   */

	}, {
		key: 'getHurryStr',
		value: function getHurryStr() {
			var firstbus = this.getNthBus(0);
			var secondbus = this.getNthBus(1);

			if (firstbus && secondbus) {
				return moment.default(firstbus).to(secondbus, true);
			}

			return 'a lot';
		}

		/**
   * Returns the nth bus from now in hh:mm format.
   * @returns {moment}
   */

	}, {
		key: 'getNthBus',
		value: function getNthBus(i) {
			if (this.busesFromNow && this.busesFromNow[i]) {
				var timeObj = moment.default(this.busesFromNow[i], 'hh:mm');
				return timeObj;
			}
			return false;
		}

		/**
   *
   */

	}, {
		key: 'refreshBusesFromNow',
		value: function refreshBusesFromNow() {
			this.busesFromNow = this.getBusesFromNow();
		}

		/**
  * Looks for all the bus starts from now, by iterating over the timetable.
  * @TODO Should be processed by the ServerApp
  * @returns {Array|False} Buses start from now today. If no more buses today, then FALSE.
  */

	}, {
		key: 'getBusesFromNow',
		value: function getBusesFromNow() {
			for (var index in this.timetable) {
				// Check is timetable item is after now. If yes, that will be the next bus.
				var busStart = moment.default(this.timetable[index], 'hh:mm');
				var isAfter = busStart.isAfter();

				if (isAfter) {
					return this.timetable.slice(index);
				}
			}

			return false;
		}
	}]);
	return Billboard;
}();

exports.default = Billboard;