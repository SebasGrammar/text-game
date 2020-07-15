import Display from './Display.js';
import {Input} from './Input.js';

export default class Game {

    constructor(datapath = '') {
        this.Display = new Display();
        this.Input = new Input();
        this.datapath = datapath;
    }

    init() {
        console.log('Initialized game from: ' + this.datapath);
        this.Display.show('<p>Hello world</p>');
    }

    userSend(message) {
        console.log('User sent: ' + message);
        this.Input.send(message);
    }

    disableInput() {
        this.Input.disable();
    }

    enableInput() {
        this.Input.enable();
    }
}