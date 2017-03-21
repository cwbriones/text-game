import Room from './room';
import Logger from './logger'
import setupInput from './input'

let logger = new Logger();
let room = new Room('Darkness', 'You find yourself in a dark room...');
room.onEnter((line) => logger.log(line));

setupInput((line) => {
    logger.log("> " + line);
    logger.log("You said \"" + line + "\"\n");
});

