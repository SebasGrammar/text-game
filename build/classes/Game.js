'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Display = require('./Display.js');

var _Display2 = _interopRequireDefault(_Display);

var _Input = require('./Input.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game() {
        var datapath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        _classCallCheck(this, Game);

        this.Display = new _Display2.default();
        this.Input = new _Input.Input();
        this.datapath = datapath;
    }

    _createClass(Game, [{
        key: 'init',
        value: function init() {
            console.log('Initialized game from: ' + this.datapath);
            this.Display.show('<p>Hello world</p>');
        }
    }, {
        key: 'userSend',
        value: function userSend(message) {
            console.log('User sent: ' + message);
            this.Input.send(message);
        }
    }, {
        key: 'disableInput',
        value: function disableInput() {
            this.Input.disable();
        }
    }, {
        key: 'enableInput',
        value: function enableInput() {
            this.Input.enable();
        }
    }]);

    return Game;
}();

exports.default = Game;