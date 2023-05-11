const passwordCheck = require('./main.ts')

async function TestPasswordGenerator() {
    let myPass;
    await passwordCheck.createStrongPassword(16).then((res) => {
        myPass = res;
    })
    //console.log('myPass is ', myPass)
    //console.log(' let us see this... ',passwordCheck.weakPasswordChecker("BABY48@#pJ",10));
    //console.log(' let us see this...11 ',passwordCheck.productKeyGenerator(20));
}

// TestPasswordGenerator();
