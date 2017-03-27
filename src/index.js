import Room from './room';
import Logger from './logger'
import setupInput from './input'

import parse, {OK, ERROR} from './parser'

const ERROR_QUIP = "I didn't catch that last part.";
const PROMPT = "> ";

const logger = new Logger()

function main() {
    let room = new Room('Darkness', 'You find yourself in a dark room...');
    room.onEnter((line) => logger.log(line));

    setupInput(handleInputLine, handleInputError);
}

function handleInputLine(line) {
    logger.log(PROMPT + line);
    const parseResult = parse(line);
    if (parseResult.type === OK) {
        if (parseResult.rest === "") {
            const sentence = parseResult.value;
            performAction(sentence);
        } else {
            logger.log(ERROR_QUIP);
            logger.debug("error: expected end of input, had \"" + parseResult.rest + "\"")
        }
    } else if (parseResult.type === ERROR) {
        logger.log(ERROR_QUIP);
        logger.debug("error: " + parseResult.value);
    }
}

function handleInputError(line) {
    logger.log(PROMPT + line);
    logger.log(ERROR_QUIP);
}

function performAction(sentence) {
    const action = sentence.action;
    const object = sentence.object;

    let message;
    if (object.types.includes(action.object_type)) {
        message = `You asked to perform action "${action.name}" on "${object.name}"`;
    } else {
        message = `You asked to perform action "${action.name}" on "${object.name}", `
            + "but that makes no sense.";
    }
    logger.log(message);
}

if (require.main === module) {
    main();
}
