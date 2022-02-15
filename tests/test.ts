import {assert, expect} from "chai";

let passwordLength = 13;
let rawPassword = "Turpen73tino!";

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
