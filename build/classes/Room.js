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