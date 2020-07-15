// GAME: https://clubhouse.io/developer-how-to/writing-object-oriented-javascript-es6-modules-with-text-rpgs/

// Object destructuring: https://medium.com/@pyrolistical/destructuring-nested-objects-9dabdd01a3b8
// Destructuring and import statements: https://github.com/babel/babel/issues/4996
// Destructuring a default export object (spoiler: it's not possible to do this): https://stackoverflow.com/questions/43814830/destructuring-a-default-export-object

// https://medium.com/@SunnyB/how-to-convert-es6-into-es5-using-babel-1b533d31a169

import Display from "./classes/Display.js" // Default export -> no {}
import { Input } from "./classes/Input.js" // Named export -> must have {}
import Game from "./classes/Game.js"

// const game = require('./text-rpg-engine');
let game = require('./classes/Game.js'); // Named export -> must have {}
game = new Game()

game.init();

// Send user input to our game (on pressing 'Enter' in the form)
document.getElementById('input').addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        game.userSend(document.getElementById('input').value);
        document.getElementById('input').value = '';
    }
});