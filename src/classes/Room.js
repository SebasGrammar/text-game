import Prompt from './prompt';

export default class Room {

  constructor(name = '', getText = '', prompts = [], requirements = []) {
    this.name = name;
    this.getText = getText; // The text that is displayed when the room is entered
    this.prompts = prompts; // What are the actions that we can do in this room?
    this.requirements = requirements; // Any requirements (items) needed to access the room
  }

  // Add new prompt / interaction to room
  addPrompt(name, keywords, results, requirements) {
    const prompt = new Prompt(name, keywords, results, requirements);

    this.prompts.push(prompt);
    return this.prompts;
  }

  // Enter the room
  enter(items = []) {
    let resultText = '';
    let metAllRequirements = true; // Can we enter the room?

    // The room is not accessible by default if we have more than one requirement (item)
    if (this.requirements > 0) {
      if (items.length === 0) {
        metAllRequirements = false;
        // Append missing requirement messages
        this.requirements.forEach(function (requirement) {
          resultText += `${requirement.failText}. `;
        });
      } else {
        // Check the room's requirements against items to see if they're all found
        this.requirements.forEach(function (requirement) {
          let found = false;

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
}