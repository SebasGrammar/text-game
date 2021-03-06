import Display from './Display.js';
import Input from './Input.js';
import Player from './Player.js';
import Room from './Room.js';
import Inventory from './Inventory.js';

export default class Game {

  constructor(datapath = '', rooms = [], items = [], startRoom = '', endRoom = '') {
    this.Display = new Display();
    this.Input = new Input();
    this.datapath = datapath; // TODO: Be able to have game initialize data from JSON file
    this.rooms = rooms; // All the rooms in our game
    this.startRoom = startRoom; // Which room will the player start in
    this.endRoom = endRoom; // Which room is the winning / game end
    this.Player = new Player(startRoom = this.startRoom);
  }

  init() {
    let displayText;

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
    for (let i = 0; i < this.rooms.length; i++) {
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
  addRoom(name, getText, prompts = [], requirements = []) {
    let roomObj = new Room(name, getText, prompts, requirements);

    this.rooms.push(roomObj);
    return roomObj;
  }

  dropRoom(roomName) {
    let newRooms = this.rooms.filter(function (room) {
      return room.name !== roomName;
    });

    this.rooms = newRooms;
    return this.rooms;
  }

  // Returns room object (properties) given the name
  getRoom(roomName) {
    const room = this.rooms.find(x => x.name === roomName);

    return room;
  }

  // User input
  userSend(message) {
    // Our Input class will handle cleaning / normalizing strings
    this.Input.send(message);
    this.decidePath(this.Input.value);
  }

  // Game AI
  decidePath(message) {
    if (message === 'restart') {
      this.resetGame();
    }
    const _this = this;
    const currRoom = _this.getRoom(_this.Player.currentRoom);

    // Do we have actions that we can do in the room?
    if (typeof currRoom.prompts !== undefined) {
      // Check every prompt action to see if it matches our input keywords
      // For now just get the first matching prompt and do that
      let foundPrompt = false;

      currRoom.prompts.forEach(function (prompt) {
        if (foundPrompt === false) {
          const matchingPromptResults = prompt.matchKeywords(message, _this.Player.inventory.items);

          // If we get a matching result back
          if (matchingPromptResults !== null) {
            // This prompt has keywords that match the user's input
            foundPrompt = true;
            // If player succeeded in prompt action
            if ('success' in matchingPromptResults) {
              _this.Display.show(`<p>${matchingPromptResults.success.successText}</p>`);
              // Get items from prompt if any are returned and add them to inventory
              if (matchingPromptResults.success.itemsGiven !== undefined) {
                _this.Player.inventory.addItems(matchingPromptResults.success.itemsGiven);
              }
              // If the prompt success result includes entering a new room..
              if (matchingPromptResults.success.roomToEnter !== undefined) {
                let enterRoomResultSuccess;
                let enterRoomResultText;

                // Check to see if player can successfully enter the room (given the inventory / room requirements)
                [enterRoomResultText, enterRoomResultSuccess] =
                                  _this.Player.enterRoom(_this.getRoom(matchingPromptResults.success.roomToEnter));
                _this.Display.append(`<p>${enterRoomResultText}</p>`);
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
              _this.Display.show(`${matchingPromptResults.fail.failText}`);
              _this.Display.append(`<p>Missing required items: ${matchingPromptResults.fail.missing.toString()}.</p>
                                    <p>${_this.getRoom(_this.Player.currentRoom).getText}</p>`);
              return;
            }
          }
        }
        if (foundPrompt === false) {
          // Player didn't say any keywords that triggered any of the current room prompts
          _this.Display.show(`<p>No actions could be done from: "${message}". Try something else, or be
                              more specific about what you're doing.</p>
                              <p>${_this.getRoom(_this.Player.currentRoom).getText}</p>`);
        }
      });
    } else {
      // No prompts exist for the current room
      _this.Display.show(`<p>There doesn't seem to be any actions at all that you can do in this room.</p>
                        ${_this.getRoom(_this.Player.currentRoom).getText}
      `);
    }
    console.log(message, this.Player);
  }

  disableInput() {
    this.Input.disable();
  }

  enableInput() {
    this.Input.enable();
  }

  // Player wins
  win() {
    // Show final room text (win text)
    this.Display.append('<p>Game end.</p>');
    // Disable any more user input after winning
    this.disableInput();
  }

  // Player resets game
  resetGame() {
    // Resets player with blank inventory and back to starting room
    this.Player.inventory = new Inventory();
    this.Player.currentRoom = this.startRoom;
    const room = this.getRoom(this.startRoom);

    this.Display.show(room.getText);
    this.Input.enable();
  }
}