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

// Add a room (by default will be beginning room since it was first added)
const startRoom = game.addRoom('Beginning', 'This is the beginning room');
// Add a second room (by default will be winning room since it was added last)
const endRoom = game.addRoom('SecondRoom', 'You did it! You won!');
// Add required item to room
endRoom.requirements.push('accessKey');

// Add room prompts
startRoom.addPrompt(
 'look',
 ['look room', 'look at room', 'search room', 'examine room', 'look in'],
 {
   'successText': 'You see a room with a door to the right and a statue in the middle.'
 }
);

startRoom.addPrompt(
 // name of prompt (required)
 'Go rightt',
 // keywords that will activate prompt (required)
 ['go right', 'move right', 'open right', 'enter right', 'door right', 'right door'],
 // results of prompt
 {
   // successful prompt result text (required)
   'successText': 'You enter in the access code "14052" and successfully open the door.',
   // failed prompt result text (optional)
   'failText': 'The door is locked with an access code!',
   // room to enter as result of prompt (optional)
   'roomToEnter': 'SecondRoom',
   // items added to inventory after successful prompt result (optional)
   'itemsGiven': 'trophy'
 },
 // required items to successfully do prompt (optional)
 ['accessKey']
);

game.init();

// Send user input to our game (on pressing 'Enter' in the form)
document.getElementById('input').addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        game.userSend(document.getElementById('input').value);
        document.getElementById('input').value = '';
    }
});