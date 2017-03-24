import {word, whitespace, anyWord, succeed} from './primitives'

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

export const verb = anyWord(['go'], 'verb');
export const noun = anyWord(['north', 'south', 'east', 'west'], 'noun');

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
    return verb(string)
        .then(whitespace)
        .then(noun, (action, target) => ({
            action,
            target
        }));
}
