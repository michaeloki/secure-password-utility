import {assert, expect} from "chai";
import {AppConstants} from "../src/constants";
import {SecurePasswordUtility} from "../src/main";

const securePasswordUtility = new SecurePasswordUtility();

const getTestVariables = new AppConstants();

before(function () {
    expect(getTestVariables.getFirstProductKey() == 16).true
    expect(getTestVariables.getSecondProductKey() == 20).true
});
describe('String length checker', function () {
    it('confirm', function () {
        expect(getTestVariables.getPasswordLength() >= 12).true
        expect(typeof getTestVariables.getRawPassword()).equal("string");
    });
});

describe('Weak password checker', function () {
    it('return a boolean result', async () => {
        console.log('return true if strong and false if it\'s weak');
        // Ronaldo!@#41
        // k%&%N8Ey4$Yx$Fp$A8 -18
        // let result = securePasswordUtility.weakPasswordChecker('Ronaldo!@#41', 12)
        //
        // result.then((response) => {
        //     assert.isFalse(response);
        // })

    });
});

describe('Create a strong password', function () {
    it('compare', function () {
        //let result = getTestVariables.getRawPassword().length == getTestVariables.getPasswordLength();
        //assert.ok(typeof result, "string");
        expect(securePasswordUtility.completePasswordGeneration(16, 'hello', 'sgfsf'))
            .contain('hello');
    });
});

describe('Generate a product key', function () {
    it('compare', function () {
        expect(securePasswordUtility.productKeyGenerator(20)).length(23);
    });
});
