import {assert, expect} from "chai";
import {AppConstants} from "../src/constants";
import {SecurePasswordUtility} from "../src/main";

let messageService;
const securePasswordUtility = new SecurePasswordUtility();

const getTestVariables = new AppConstants();
    describe('String length checker', function () {
    it('confirm', function () {
        expect(getTestVariables.getPasswordLength() >= 12).true
        expect(typeof getTestVariables.getRawPassword()).equal("string");
    });
});

describe('Weak password checker', function () {
    it('return a boolean result', async () => {
        let passwordState = '';
        // Ronaldo!@#41
        //k%&%N8Ey4$Yx$Fp$A8 -18
        let result =  securePasswordUtility.weakPasswordChecker('Ronaldo!@#41',12)

        result.then((response) => {
            console.log('resp is ',response)
            // if(response) {
            //     passwordState='true'
            //     console.log('psss ', passwordState);
            //     expect(passwordState, 'true')
            // }
            //expect(response, 'true' )
            //assert.equal(response, true)
            //passwordState = response

        })

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
