import {assert, expect} from "chai";

let passwordLength = 13;
let rawPassword = "Turpen73tino!";
let productKeyLengthA = 16;
let productKeyLengthB = 20;

describe('StringChecker', function () {
    it('confirm', function () {
        expect(passwordLength >= 10).equal(true);
        expect(typeof rawPassword).equal("string");
    });
});

describe('WeakPasswordChecker', function () {
    it('compare', function () {
        let result = rawPassword.length == passwordLength;
        expect(result).equal(true);
    });
});

describe('CreateStrongPassword', function () {
    it('compare', function () {
        let result = rawPassword.length == passwordLength;
        assert.ok(typeof result,"string");
    });
});

describe('ProductKeyGenerator', function () {
    it('compare', function () {
        let inputA = productKeyLengthA%4;
        let inputB = productKeyLengthB%5;
        // expect(result).equal(true);

        expect( (inputA || inputB)).equal( 0);
            //.equal(true);
        expect(productKeyLengthA >= 16).equal(true);
    });
});
