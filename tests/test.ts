import {assert, expect} from "chai";
const getTestVariables = require('../src/constants.ts');


describe('String Length Checker', function () {
    it('confirm', function () {
        expect(getTestVariables.getPasswordLength() >= 10).true
        expect(typeof getTestVariables.getRawPassword()).equal("string");
    });
});

describe('WeakPasswordChecker', function () {
    it('compare', function () {
        let result = getTestVariables.getRawPassword().length == getTestVariables.getPasswordLength();
        expect(result).equal(true);
    });
});

describe('CreateStrongPassword', function () {
    it('compare', function () {
        let result = getTestVariables.getRawPassword().length == getTestVariables.getPasswordLength();
        assert.ok(typeof result,"string");
    });
});

describe('ProductKeyGenerator', function () {
    it('compare', function () {
        expect( (getTestVariables.getFirstProductKey()%4 || getTestVariables.getSecondProductKey()%5)).equal( 0);
        expect(getTestVariables.getFirstProductKey() >= 16).equal(true);
    });
});
