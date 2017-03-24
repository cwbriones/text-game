import _ from 'lodash';
import {OK, ERROR, ok, error, ParseResult} from '../parser';

export function succeed(a) {
    return function(string) {
        return ok(string, a);
    };
}

export function anyWord(words, tag) {
    return function(string) {
        const result = word(string);
        switch (result.type) {
            case OK:
                if (words.indexOf(result.value) !== -1) {
                    return result;
                } else {
                    return error(`"${result.value}" is not a valid ${tag}`);
                }
            case ERROR:
                return result;
        }
    };
}

export function anyOf(chars, errorMessage='') {
    return function(string) {
        const index = _.findIndex(string, c => {
            return chars.indexOf(c) < 0;
        });
        if (index === 0) {
            return error(errorMessage);
        } else if (index === -1) {
            return ok('', string);
        } else {
            const value = string.slice(0, index);
            const rest = string.slice(index);

            return ok(rest, value)
        }
    }
}

export const word = anyOf('abcdefghijklmnopqrstuvwxyz1234567890', 'expected word');
export const whitespace = anyOf('\n\r\t ', 'expected whitespace');

