import {assert, expect} from "chai";
import {AppConstants} from "../src/constants";
import {SecurePasswordUtility} from "../src/main";

const securePasswordUtility = new SecurePasswordUtility();

const getTestVariables = new AppConstants();
    describe('String length checker', function () {
    it('confirm', function () {
        expect(getTestVariables.getPasswordLength() >= 12).true
        expect(typeof getTestVariables.getRawPassword()).equal("string");
    });
});

describe('Weak password checker', function () {
    // it('compare', function () {
    //     let result = securePasswordUtility.weakPasswordChecker('Ronaldo!@#41',12);
    //     console.log('rrrr==== ',result);
    //     expect(result.then((response) => response)).equal(true);
    //
    //     //let result = getTestVariables.getRawPassword().length == getTestVariables.getPasswordLength();
    //     //expect(result).equal(true);
    // });
    it('return a result', async () => {
        let result = securePasswordUtility.weakPasswordChecker('Ronaldo!@#41',12)
        console.log('result is ', result);
            // .then((response) => {
            //     console.log('resp is ',response)
            //     assert.equal(response, false)
            // })
    } );
});

describe('Create a strong password', function () {
    it('compare', function () {
        let result = getTestVariables.getRawPassword().length == getTestVariables.getPasswordLength();
        assert.ok(typeof result,"string");
        expect(securePasswordUtility.completePasswordGeneration(16,'hello','sgfsf'))
            .contain('hello');
    });
});

describe('Generate a product key', function () {
    it('compare', function () {
        expect(securePasswordUtility.productKeyGenerator(20)).length(23);
    });
});
