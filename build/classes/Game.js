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