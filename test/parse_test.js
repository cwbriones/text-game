import {expect} from 'chai';

import parse, {OK, ERROR} from 'parser';
import {word, whitespace, succeed} from 'parser/primitives';

describe('primitives', function() {
    describe('succeed', function() {
        it('should return the value given', function() {
            expect(succeed(42)('abc')).to.deep.eq({
                type: OK,
                value: 42,
                rest: 'abc',
            });
        });
    });

    describe('word', function() {
        it('should accept single characters', function() {
            expect(word('a')).to.deep.eq({
                type: OK,
                rest: '',
                value: 'a',
            });
        });

        it('should only read in alphanumeric characters', function() {
            expect(word('abc123  ')).to.deep.eq({
                type: OK,
                rest: '  ',
                value: 'abc123',
            });
        });

        it('should fail for non-alphanumeric characters', function() {
            expect(word('$$$(0_0)$$$')).to.deep.eq({
                type: ERROR,
                rest: null,
                value: 'expected word',
            });
        });
    });

    describe('whitespace', function() {
        it('should accept all types of whitespace', function() {
            expect(whitespace('\r\r\r\t    \n \t\rcool')).to.deep.eq({
                type: OK,
                rest: 'cool',
                value: '\r\r\r\t    \n \t\r',
            });
        });
    });
});

describe('parse', function() {
    it('should handle simple actions', function() {
        expect(parse('go north')).to.deep.eq({
            type: OK,
            rest: '',
            value: {
                action: 'go',
                target: 'north',
            }
        });
    });

    it('should deny undefined verbs', function() {
        expect(parse('flub north')).to.deep.eq({
            type: ERROR,
            rest: null,
            value: '"flub" is not a valid verb'
        });
    });

    it('should deny undefined nouns', function() {
        expect(parse('go qux')).to.deep.eq({
            type: ERROR,
            rest: null,
            value: '"qux" is not a valid noun'
        });
    });
});
