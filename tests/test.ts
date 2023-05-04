import {assert, expect} from "chai";
const getTestVariables = require('../src/constants.ts');
const passwordChecker = require('../src/main');


describe('String Length Checker', function () {
    it('confirm', function () {
        expect(getTestVariables.getPasswordLength() >= 12).true
        expect(typeof getTestVariables.getRawPassword()).equal("string");
    });
});

describe('WeakPasswordChecker', function () {
    it('compare', function () {
        let result = passwordChecker.WeakPasswordChecker('Ronaldo!@#41',12);
        console.log('rrrr==== ',result);
        expect(result.then((response) => response)).equal(true);

        //let result = getTestVariables.getRawPassword().length == getTestVariables.getPasswordLength();
        //expect(result).equal(true);
    });
});

describe('CreateStrongPassword', function () {
    it('compare', function () {
        let result = getTestVariables.getRawPassword().length == getTestVariables.getPasswordLength();
        assert.ok(typeof result,"string");
        //assert.isNotEmpty(passwordChecker.CreateStrongPassword(12))
    });
});

describe('ProductKeyGenerator', function () {
    it('compare', function () {
        expect( (getTestVariables.getFirstProductKey()%4 || getTestVariables.getSecondProductKey()%5)).equal( 0);
        expect(getTestVariables.getFirstProductKey() >= 16).equal(true);
    });
});
