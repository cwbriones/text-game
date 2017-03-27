import _ from 'lodash';

import {word, whitespace, anyWord, succeed} from './primitives'
import {ACTIONS} from '../definitions/action'
import {OBJECTS} from '../definitions/object'

//=============================================================================
// Types
//=============================================================================

export const OK = "OK";
export const ERROR = "ERROR";

class ParseResult {
    constructor(type, rest, value) {
        this.type = type;
        this.rest = rest;
        this.value = value;
    }

    done() {
        return this.rest == "";
    }

    map(f) {
        if (this.type == OK) {
            const value = f(this.value);
            return new ParseResult(this.type, this.rest, value);
        } else {
            return this;
        }
    }

    then(parser, transformer=id) {
        if (this.type == OK) {
            const result = parser(this.rest);
            return result.map((value) => transformer(this.value, value));
        } else {
            return this;
        }
    }
}

function id(a) {
    return a;
}

export function ok(rest, value=null) {
    return new ParseResult(OK, rest, value);
}

export function error(message) {
    return new ParseResult(ERROR, null, message);
}

function definedWords(definitions, definition_type) {
    const names = _.map(definitions, def => def.name);
    const nameParser = anyWord(names, definition_type);
    return function(string) {
        return nameParser(string).map(name => resolveDefinition(definitions, name));
    }
}

function resolveDefinition(definitions, name) {
    return _.find(definitions, def => def.name == name);
}

export const action = definedWords(ACTIONS, 'action');
export const object = definedWords(OBJECTS, 'object');

export default function parse(string) {
    // sentence = <verb> WS (preposition) WS <object>
    //
    // object   = (adjective) <noun>
    //
    // noun = (article) <word>
    //
    // article = "the" | "a" | "an"
    //
    // word = [a-z0-9]+
    return action(string)
        .then(whitespace)
        .then(object, (actionName, objectName) => ({
            action: actionName,
            object: objectName,
        }));
}
