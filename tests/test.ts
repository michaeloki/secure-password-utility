import {assert, expect} from "chai";
const securePasswordUtility = require('../src/main')
const getTestVariables = require('../src/constants')

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
    it('return true if strong and false if it\'s weak', async () => {
        let passwordStrength = false;
        // Ronaldo!@#41
        // k%&%N8Ey4$Yx$Fp$A8 -18
        await securePasswordUtility.weakPasswordChecker('Ronaldo!@#41', 12)
        .then((response) => {
            passwordStrength = response
        })
        expect(passwordStrength).false;
    });
});

describe('Create a strong password', function () {
    it('compare', async function () {
        let result = getTestVariables.getRawPassword().length == getTestVariables.getPasswordLength();
        assert.ok(typeof result, "string");
        expect(securePasswordUtility.completePasswordGeneration(16, 'hello', 'sgfsf'))
            .contain('hello');
        let password;
        await securePasswordUtility.createStrongPassword(16).then((res) => {
            password = res;
        })
        expect(password).length(16);
    });
});

describe('Generate a product key', function () {
    it('compare', function () {
        let productKey = securePasswordUtility.productKeyGenerator(24);
        expect(productKey).contain('-')
        expect(securePasswordUtility.productKeyGenerator(20)).length(23);
    });
});
