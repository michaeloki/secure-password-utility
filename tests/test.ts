import { assert, expect } from 'chai';
import {
    weakPasswordChecker,
    completePasswordGeneration,
    strongPasswordGenerator,
    createStrongPassword,
    productKeyGenerator,
    batchProductKeyGenerator,
    InvalidInputError
} from '../src/main';
import { inputValidator, stringCaster } from '../src/utils/util';
import { secureRandomInt } from '../src/utils/random';
import {
    MIN_PASSWORD_LENGTH,
    MIN_PRODUCT_KEY_LENGTH,
    MAX_PRODUCT_KEY_LENGTH
} from '../src/constants';

const PRODUCT_KEY_FORMAT = /^[A-Z0-9]+(-[A-Z0-9]+)*$/;
const COMPLEXITY = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).+$/;

describe('inputValidator', function () {
    it('accepts positive integers and numeric strings', function () {
        expect(inputValidator(16)).equal(16);
        expect(inputValidator('16')).equal(16);
    });

    it('rejects non-integers, non-positives and junk instead of coercing', function () {
        assert.throws(() => inputValidator(null), InvalidInputError);
        assert.throws(() => inputValidator(undefined), InvalidInputError);
        assert.throws(() => inputValidator('12abc'), InvalidInputError);
        assert.throws(() => inputValidator(16.5), InvalidInputError);
        assert.throws(() => inputValidator(0), InvalidInputError);
        assert.throws(() => inputValidator(-4), InvalidInputError);
    });
});

describe('stringCaster', function () {
    it('casts string-like primitives', function () {
        expect(stringCaster('abc')).equal('abc');
        expect(stringCaster(123)).equal('123');
    });

    it('rejects null, undefined and objects', function () {
        assert.throws(() => stringCaster(null), InvalidInputError);
        assert.throws(() => stringCaster(undefined), InvalidInputError);
        assert.throws(() => stringCaster({}), InvalidInputError);
    });
});

describe('secureRandomInt', function () {
    it('returns integers within [0, maxExclusive)', function () {
        for (let i = 0; i < 200; i++) {
            const value = secureRandomInt(62);
            expect(value).to.be.at.least(0);
            expect(value).to.be.below(62);
            expect(value % 1).equal(0);
        }
    });

    it('uses the full range', function () {
        const seen = new Set<number>();
        for (let i = 0; i < 500; i++) {
            seen.add(secureRandomInt(10));
        }
        expect(seen.size).equal(10);
    });
});

describe('weakPasswordChecker', function () {
    it('accepts a strong password', async function () {
        expect(await weakPasswordChecker('Xk9#mQw2vTzb', 12)).true;
    });

    it('rejects passwords missing a character class (complexity check always runs)', async function () {
        // These used to pass when they avoided the wordlist.
        expect(await weakPasswordChecker('XkqPmwvTtzbe', 12)).false;  // no digit
        expect(await weakPasswordChecker('Xkq9Pmw2vTzb', 12)).false;  // no special char
        expect(await weakPasswordChecker('xk9#mw2vtzb!', 12)).false;  // no upper-case
        expect(await weakPasswordChecker('XK9#MW2VTZB!', 12)).false;  // no lower-case
    });

    it('rejects common passwords and fragments', async function () {
        expect(await weakPasswordChecker('Ronaldo!@#41', 12)).false;
        expect(await weakPasswordChecker('Passkey!@#41', 12)).false;
    });

    it('honours caller-supplied words', async function () {
        expect(await weakPasswordChecker('Xk9#mQw2vTzb', 12, ['mQw2'])).false;
        expect(await weakPasswordChecker('Xk9#mQw2vTzb', 12, ['zzzzz'])).true;
    });

    it('enforces length rules', async function () {
        expect(await weakPasswordChecker('Xk9#mQw2vTz', 11)).false;   // below minimum
        expect(await weakPasswordChecker('Xk9#mQw2vTzb', 13)).false;  // length mismatch
    });

    it('returns false for invalid input instead of throwing', async function () {
        expect(await weakPasswordChecker(null, 12)).false;
        expect(await weakPasswordChecker('Xk9#mQw2vTzb', 'junk')).false;
    });
});

describe('strongPasswordGenerator', function () {
    it('generates a password of the requested length with all character classes', function () {
        for (const length of [12, 13, 15, 16, 23]) {
            const password = strongPasswordGenerator(length);
            expect(password).length(length);
            expect(COMPLEXITY.test(password)).true;
        }
    });

    it('throws for lengths below the minimum or invalid input', function () {
        assert.throws(() => strongPasswordGenerator(11), InvalidInputError);
        assert.throws(() => strongPasswordGenerator('junk'), InvalidInputError);
    });
});

describe('completePasswordGeneration', function () {
    it('keeps the prefix and appends the requested number of characters', function () {
        const result = completePasswordGeneration(16, 'hello', 'sgfsf');
        expect(result).length(21);
        expect(result.startsWith('hello')).true;
        for (const char of result.slice(5)) {
            expect('sgfsf').contain(char);
        }
    });

    it('throws on empty charset or invalid length', function () {
        assert.throws(() => completePasswordGeneration(16, '', ''), InvalidInputError);
        assert.throws(() => completePasswordGeneration(-1, '', 'abc'), InvalidInputError);
    });
});

describe('createStrongPassword', function () {
    it('returns a verified strong password of the requested length', async function () {
        const password = await createStrongPassword(16);
        expect(password).length(16);
        expect(await weakPasswordChecker(password, 16)).true;
    });

    it('throws for unsupported lengths', async function () {
        await createStrongPassword(11).then(
            () => assert.fail('expected rejection'),
            (error) => expect(error).instanceOf(InvalidInputError)
        );
        await createStrongPassword(50).then(
            () => assert.fail('expected rejection'),
            (error) => expect(error).instanceOf(InvalidInputError)
        );
    });
});

describe('productKeyGenerator', function () {
    it('generates dash-grouped keys for valid lengths', function () {
        const key24 = productKeyGenerator(24);
        expect(key24).match(PRODUCT_KEY_FORMAT);
        expect(key24.replace(/-/g, '')).length(24);

        const key20 = productKeyGenerator(20); // divisible by both 4 and 5 -> groups of 5
        expect(key20).length(23);
        expect(key20.split('-')).length(4);

        const key16 = productKeyGenerator(16); // groups of 4
        expect(key16.split('-')).length(4);

        const key100 = productKeyGenerator(String(MAX_PRODUCT_KEY_LENGTH));
        expect(key100.replace(/-/g, '')).length(MAX_PRODUCT_KEY_LENGTH);
    });

    it('throws for unsupported lengths', function () {
        for (const bad of [MIN_PRODUCT_KEY_LENGTH - 1, 17, 101, 0, 'junk']) {
            assert.throws(() => productKeyGenerator(bad), InvalidInputError);
        }
    });
});

describe('batchProductKeyGenerator', function () {
    it('generates the requested number of well-formed keys', function () {
        const keys = batchProductKeyGenerator(25, 50);
        expect(keys).length(50);
        for (const key of keys) {
            expect(key).match(PRODUCT_KEY_FORMAT);
            expect(key.replace(/-/g, '')).length(25);
        }
    });

    it('no longer returns empty strings for invalid lengths', function () {
        assert.throws(() => batchProductKeyGenerator(17, 3), InvalidInputError);
        assert.throws(() => batchProductKeyGenerator(25, NaN as unknown as number), InvalidInputError);
    });
});
