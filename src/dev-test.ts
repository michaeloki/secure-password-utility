const passwordCheck = require('./main.ts')

async function TestPasswordGenerator() {
//     let myPass, myKeys;
//     await passwordCheck.createStrongPassword(16).then((res) => {
//         myPass = res;
//     })
    // console.log('myPass is ', myPass)
     console.log(' let us see this... ',passwordCheck.weakPasswordChecker("tesT1234567!",12));
    // console.log(' let us see this... ',passwordCheck.weakPasswordChecker("BABY48@#pJ",10));
    // console.log(' productKey is ',passwordCheck.productKeyGenerator(25)); //tesT123456!
    // batchProductKeyGenerator
    
    // console.log('batchProductKeyGenerator are ', passwordCheck.batchProductKeyGenerator(25, 40));
}

async function SampleCall () {
    let passwordStrength = false;
    await passwordCheck.weakPasswordChecker('tesT1234567@#', 13)
        .then((response) => {
            passwordStrength = response
    })
    if(passwordStrength) {
        console.log("secure password");
    } else {
        console.log("weak password");
    }
}

SampleCall();
