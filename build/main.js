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