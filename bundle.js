(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Display = function () {
    function Display() {
        var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var elementId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'display';

        _classCallCheck(this, Display);

        this.html = html;
        this.elementId = elementId;
    }

    _createClass(Display, [{
        key: 'show',
        value: function show() {
            var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (html === null) {
                document.getElementById(this.elementId).innerHTML = this.html;
            } else {
                document.getElementById(this.elementId).innerHTML = html;
                this.html = html;
            }
        }

        // Append HTML content to display screen

    }, {
        key: 'append',
        value: function append(html) {
            document.getElementById(this.elementId).innerHTML += html;
        }
    }]);

    return Display;
}();

exports.default = Display;
},{}],2:[function(require,module,exports){
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
},{"./Display.js":1,"./Input.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = exports.Input = function () {
    function Input() {
        var disabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var elementId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'input';

        _classCallCheck(this, Input);

        this.disabled = disabled;
        this.value = value;
        this.elementId = elementId;
    }

    _createClass(Input, [{
        key: 'enable',
        value: function enable() {
            this.disabled = false;
            document.getElementById('input').disabled = false;
        }
    }, {
        key: 'disable',
        value: function disable() {
            this.disabled = true;
            document.getElementById('input').disabled = true;
        }
    }, {
        key: 'send',
        value: function send(value) {
            // Normalize input values (if desired)
            value = value.toLowerCase();
            this.value = value;
        }
    }]);

    return Input;
}();
},{}],4:[function(require,module,exports){
"use strict";

var _Display = require("./classes/Display.js");

var _Display2 = _interopRequireDefault(_Display);

var _Input = require("./classes/Input.js");

var _Game = require("./classes/Game.js");

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const game = require('./text-rpg-engine');
// Default export -> no {}
var game = require('./classes/Game.js'); // Named export -> must have {}
// Named export -> must have {}
// GAME: https://clubhouse.io/developer-how-to/writing-object-oriented-javascript-es6-modules-with-text-rpgs/

// Object destructuring: https://medium.com/@pyrolistical/destructuring-nested-objects-9dabdd01a3b8
// Destructuring and import statements: https://github.com/babel/babel/issues/4996
// Destructuring a default export object (spoiler: it's not possible to do this): https://stackoverflow.com/questions/43814830/destructuring-a-default-export-object

// https://medium.com/@SunnyB/how-to-convert-es6-into-es5-using-babel-1b533d31a169

game = new _Game2.default();

game.init();

// Send user input to our game (on pressing 'Enter' in the form)
document.getElementById('input').addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        game.userSend(document.getElementById('input').value);
        document.getElementById('input').value = '';
    }
});
},{"./classes/Display.js":1,"./classes/Game.js":2,"./classes/Input.js":3}]},{},[4]);
