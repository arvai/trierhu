'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Bootstrap for providing system-wide variables and functions.
 */

var bootstrap = function bootstrap() {
	(0, _classCallCheck3.default)(this, bootstrap);

	// App Config
	this.config = {};
	this.config.ENV = process.env.NODE_ENV;
	this.config.BACKEND = 'http://ws.trier.hu';
};

exports.default = bootstrap;