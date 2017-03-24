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
            const action = parseResult.value.action;
            const target = parseResult.value.target;
            logger.log(`You asked to perform action "${action}" on "${target}"`);
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

if (require.main === module) {
    main();
}
