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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Display = require('./Display.js');

var _Display2 = _interopRequireDefault(_Display);

var _Input = require('./Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _Player = require('./Player.js');

var _Player2 = _interopRequireDefault(_Player);

var _Room = require('./Room.js');

var _Room2 = _interopRequireDefault(_Room);

var _Inventory = require('./Inventory.js');

var _Inventory2 = _interopRequireDefault(_Inventory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    var datapath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var rooms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var items = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var startRoom = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var endRoom = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

    _classCallCheck(this, Game);

    this.Display = new _Display2.default();
    this.Input = new _Input2.default();
    this.datapath = datapath; // TODO: Be able to have game initialize data from JSON file
    this.rooms = rooms; // All the rooms in our game
    this.startRoom = startRoom; // Which room will the player start in
    this.endRoom = endRoom; // Which room is the winning / game end
    this.Player = new _Player2.default(startRoom = this.startRoom);
  }

  _createClass(Game, [{
    key: 'init',
    value: function init() {
      var displayText = void 0;

      console.log('Initialized game from: ' + this.datapath);
      // this.loadData(this.dataPath); // TODO: Make games load from JSON data
      // If game wasn't initialized with a startRoom, set it to the first room
      if (this.startRoom === '' && this.rooms.length > 0) {
        this.startRoom = this.rooms[0].name;
        this.Player.startRoom = this.startRoom;
        this.Player.currentRoom = this.Player.startRoom;
      }
      // If game wasn't initialized with a endRoom, set it to the last room
      if (this.endRoom === '' && this.rooms.length > 1) {
        this.endRoom = this.rooms[this.rooms.length - 1].name;
      }
      for (var i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].name === this.startRoom) {
          displayText = this.rooms[i].getText;
          break;
        }
      }
      if (displayText === undefined) {
        displayText = 'No starting room text found!';
      }
      this.Display.show(displayText);
    }

    // Manage rooms

  }, {
    key: 'addRoom',
    value: function addRoom(name, getText) {
      var prompts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var requirements = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

      var roomObj = new _Room2.default(name, getText, prompts, requirements);

      this.rooms.push(roomObj);
      return roomObj;
    }
  }, {
    key: 'dropRoom',
    value: function dropRoom(roomName) {
      var newRooms = this.rooms.filter(function (room) {
        return room.name !== roomName;
      });

      this.rooms = newRooms;
      return this.rooms;
    }

    // Returns room object (properties) given the name

  }, {
    key: 'getRoom',
    value: function getRoom(roomName) {
      var room = this.rooms.find(function (x) {
        return x.name === roomName;
      });

      return room;
    }

    // User input

  }, {
    key: 'userSend',
    value: function userSend(message) {
      // Our Input class will handle cleaning / normalizing strings
      this.Input.send(message);
      this.decidePath(this.Input.value);
    }

    // Game AI

  }, {
    key: 'decidePath',
    value: function decidePath(message) {
      if (message === 'restart') {
        this.resetGame();
      }
      var _this = this;
      var currRoom = _this.getRoom(_this.Player.currentRoom);

      // Do we have actions that we can do in the room?
      if (_typeof(currRoom.prompts) !== undefined) {
        // Check every prompt action to see if it matches our input keywords
        // For now just get the first matching prompt and do that
        var foundPrompt = false;

        currRoom.prompts.forEach(function (prompt) {
          if (foundPrompt === false) {
            var matchingPromptResults = prompt.matchKeywords(message, _this.Player.inventory.items);

            // If we get a matching result back
            if (matchingPromptResults !== null) {
              // This prompt has keywords that match the user's input
              foundPrompt = true;
              // If player succeeded in prompt action
              if ('success' in matchingPromptResults) {
                _this.Display.show('<p>' + matchingPromptResults.success.successText + '</p>');
                // Get items from prompt if any are returned and add them to inventory
                if (matchingPromptResults.success.itemsGiven !== undefined) {
                  _this.Player.inventory.addItems(matchingPromptResults.success.itemsGiven);
                }
                // If the prompt success result includes entering a new room..
                if (matchingPromptResults.success.roomToEnter !== undefined) {
                  var enterRoomResultSuccess = void 0;
                  var enterRoomResultText = void 0;

                  // Check to see if player can successfully enter the room (given the inventory / room requirements)

                  var _this$Player$enterRoo = _this.Player.enterRoom(_this.getRoom(matchingPromptResults.success.roomToEnter));

                  var _this$Player$enterRoo2 = _slicedToArray(_this$Player$enterRoo, 2);

                  enterRoomResultText = _this$Player$enterRoo2[0];
                  enterRoomResultSuccess = _this$Player$enterRoo2[1];

                  _this.Display.append('<p>' + enterRoomResultText + '</p>');
                  if (enterRoomResultSuccess) {
                    // Check to see if player entered winning room
                    if (matchingPromptResults.success.roomToEnter === _this.endRoom) {
                      _this.win();
                    }
                  } else {
                    // Player could not enter room (missing required items in inventory)
                  }
                }
              }
              // Player failed to do prompt (missing item requirement)
              if ('fail' in matchingPromptResults) {
                _this.Display.show('' + matchingPromptResults.fail.failText);
                _this.Display.append('<p>Missing required items: ' + matchingPromptResults.fail.missing.toString() + '.</p>\n                                    <p>' + _this.getRoom(_this.Player.currentRoom).getText + '</p>');
                return;
              }
            }
          }
          if (foundPrompt === false) {
            // Player didn't say any keywords that triggered any of the current room prompts
            _this.Display.show('<p>No actions could be done from: "' + message + '". Try something else, or be\n                              more specific about what you\'re doing.</p>\n                              <p>' + _this.getRoom(_this.Player.currentRoom).getText + '</p>');
          }
        });
      } else {
        // No prompts exist for the current room
        _this.Display.show('<p>There doesn\'t seem to be any actions at all that you can do in this room.</p>\n                        ' + _this.getRoom(_this.Player.currentRoom).getText + '\n      ');
      }
      console.log(message, this.Player);
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

    // Player wins

  }, {
    key: 'win',
    value: function win() {
      // Show final room text (win text)
      this.Display.append('<p>Game end.</p>');
      // Disable any more user input after winning
      this.disableInput();
    }

    // Player resets game

  }, {
    key: 'resetGame',
    value: function resetGame() {
      // Resets player with blank inventory and back to starting room
      this.Player.inventory = new _Inventory2.default();
      this.Player.currentRoom = this.startRoom;
      var room = this.getRoom(this.startRoom);

      this.Display.show(room.getText);
      this.Input.enable();
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"./Display.js":1,"./Input.js":3,"./Inventory.js":4,"./Player.js":5,"./Room.js":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Input = function () {
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

exports.default = Input;
},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Inventory = function () {
  function Inventory() {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Inventory);

    this.items = items;
  }

  // We can use this to add single or multiple items, as long as the
  // passed value is an array


  _createClass(Inventory, [{
    key: "addItems",
    value: function addItems(items) {
      this.items = this.items.concat(items);
      return this.items;
    }
  }, {
    key: "dropItem",
    value: function dropItem(itemName) {
      var newInventory = this.items.filter(function (item) {
        return item.name !== itemName;
      });

      this.items = newInventory;
      return this.items;
    }
  }]);

  return Inventory;
}();

exports.default = Inventory;
},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Inventory = require('./Inventory.js');

var _Inventory2 = _interopRequireDefault(_Inventory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var inventory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Inventory2.default();
    var currentRoom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var startRoom = arguments[3];

    _classCallCheck(this, Player);

    this.name = name;
    if (this.name === '') {
      this.name = 'player';
    }
    this.inventory = inventory;
    if (this.currentRoom === '') {
      this.currentRoom = this.startRoom;
    }
    this.startRoom = startRoom;
  }

  _createClass(Player, [{
    key: 'enterRoom',
    value: function enterRoom(room) {
      var roomResult = room.enter(this.inventory.items);

      if (roomResult[1] === false) {
        // Player did not have required items to enter the room
      } else {
        // Entered room successfully
        this.currentRoom = room.name;
      }
      // Return results text and whether or not player successfully entered room
      return [roomResult[0], roomResult[1]];
    }
  }, {
    key: 'getItem',
    value: function getItem(item) {
      this.inventory.addItem(item);
      return this.inventory;
    }
  }, {
    key: 'dropItem',
    value: function dropItem(item) {
      this.inventory.dropItem(item);
      return this.inventory;
    }
  }]);

  return Player;
}();

exports.default = Player;
},{"./Inventory.js":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _prompt = require('./prompt');

var _prompt2 = _interopRequireDefault(_prompt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Room = function () {
  function Room() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var getText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var prompts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var requirements = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    _classCallCheck(this, Room);

    this.name = name;
    this.getText = getText; // The text that is displayed when the room is entered
    this.prompts = prompts; // What are the actions that we can do in this room?
    this.requirements = requirements; // Any requirements (items) needed to access the room
  }

  // Add new prompt / interaction to room


  _createClass(Room, [{
    key: 'addPrompt',
    value: function addPrompt(name, keywords, results, requirements) {
      var prompt = new _prompt2.default(name, keywords, results, requirements);

      this.prompts.push(prompt);
      return this.prompts;
    }

    // Enter the room

  }, {
    key: 'enter',
    value: function enter() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var resultText = '';
      var metAllRequirements = true; // Can we enter the room?

      // The room is not accessible by default if we have more than one requirement (item)
      if (this.requirements > 0) {
        if (items.length === 0) {
          metAllRequirements = false;
          // Append missing requirement messages
          this.requirements.forEach(function (requirement) {
            resultText += requirement.failText + '. ';
          });
        } else {
          // Check the room's requirements against items to see if they're all found
          this.requirements.forEach(function (requirement) {
            var found = false;

            this.items.forEach(function (item) {
              if (item === requirement) {
                found = true;
              }
            });
            if (found === false) {
              metAllRequirements = false;
              // Return fail messages for missing requirements
              resultText += requirement.failText;
            }
          });
          // If all item requirements have been found, return room text
          if (metAllRequirements === true) {
            resultText = this.getText;
          }
        }
        // No items required to enter the room, return room text
      } else {
        resultText = this.getText;
      }
      // Return resulting text and whether or not room could be entered
      return [resultText, metAllRequirements];
    }
  }]);

  return Room;
}();

exports.default = Room;
},{"./prompt":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Prompt = function () {
    function Prompt() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var keywords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var results = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var requirements = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

        _classCallCheck(this, Prompt);

        this.name = name;
        // Keywords that can trigger the prompt (make all lower-case by default)
        this.keywords = keywords.map(function (v) {
            return v.toLowerCase();
        });
        // Results that occur when this prompt is successfully triggered;
        // the result keys comprise of “successText” (required), "failText" (optional),
        // “itemsRequired” (optional), and “roomToEnter” (optional)
        this.results = results;
        // Any prerequisite items needed to do the prompt?
        this.requirements = requirements;
    }

    _createClass(Prompt, [{
        key: 'matchKeywords',
        value: function matchKeywords(message) {
            var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var foundKeyword = false;
            var missingRequirements = []; // If we have any item requirements

            if (this.requirements.length > 0) {
                // Check all the requirements against the items passed
                this.requirements.forEach(function (requirement) {
                    var foundRequirement = false;
                    items.forEach(function (item) {
                        if (item === requirement) {
                            foundRequirement = true;
                        }
                    }); // If a requirement isn't found add that a list

                    if (!foundRequirement) {
                        missingRequirements.push(requirement);
                    }
                });
            } // Once we check to see if the player's missing any items,
            // parse the input for matching keywords to the prompt


            this.keywords.forEach(function (keyword) {
                if (message.includes(keyword.toLowerCase())) {
                    foundKeyword = true;
                }
            }); // If any keywords have been matched from the user input

            if (foundKeyword) {
                // If there are any missing item requirements
                if (missingRequirements.length > 0) {
                    // Prompt fails; return missing items and failText
                    return {
                        'fail': {
                            'missing': missingRequirements,
                            'failText': this.results.failText
                        }
                    };
                } // Prompt succeeds; return results of the prompt


                return {
                    'success': this.results
                };
            }

            return null;
        }
    }]);

    return Prompt;
}();

exports.default = Prompt;
},{}],8:[function(require,module,exports){
"use strict";

var _Display = require("./classes/Display.js");

var _Display2 = _interopRequireDefault(_Display);

var _Input = require("./classes/Input.js");

var _Input2 = _interopRequireDefault(_Input);

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

// Add a room (by default will be beginning room since it was first added)
var startRoom = game.addRoom('Beginning', 'This is the beginning room');
// Add a second room (by default will be winning room since it was added last)
var endRoom = game.addRoom('SecondRoom', 'You did it! You won!');
// Add required item to room
endRoom.requirements.push('accessKey');

// Add required item to room
endRoom.requirements.push('accessKey');

// Add room prompts
startRoom.addPrompt(
// name of prompt (required)
'go right',
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
  'itemsGiven': ['trophy']
},
// required items to successfully do prompt
['accessKey']);

startRoom.addPrompt('look', ['look room', 'look at room', 'search room', 'examine room', 'look in'], {
  'successText': 'You see a room with a door to the right and a statue in the middle.'
});

startRoom.addPrompt('get statue', ['get statue', 'pick up statue', 'take statue', 'pick statue'], {
  'successText': "You pick up the statue. It feels heavy in your hands, and there's something hanging off\n                    the bottom.",
  'itemsGiven': ['statue']
});

startRoom.addPrompt('rotate statue', ['rotate statue', 'rotate the statue'], {
  'successText': 'You take the note from the bottom of the statue.',
  'failText': 'You have no statue to look at!',
  'itemsGiven': ['note']
}, ['statue']);

startRoom.addPrompt('look', ['look at note', 'examine note', 'take note', 'get note', 'check note', 'read note', 'look note'], {
  'successText': 'You look at the note and find an access code: "14052."',
  'failText': 'You have no note to look at!',
  'itemsGiven': ['accessKey']
}, ['statue', 'note']);

game.init();

// Send user input to our game (on pressing 'Enter' in the form)
document.getElementById('input').addEventListener('keypress', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    game.userSend(document.getElementById('input').value);
    document.getElementById('input').value = '';
  }
});
},{"./classes/Display.js":1,"./classes/Game.js":2,"./classes/Input.js":3}]},{},[8]);
