
const passwordCheck = require('./main')

function TestPasswordGenerator() {
    console.log(passwordCheck.SecurePasswordUtility().createStrongPassword(16));//.CreateStrongPassword(16));
    // console.log(passwordCheck.WeakPasswordChecker("BABY48@#pJ",10));
    // console.log(passwordCheck.ProductKeyGenerator(99));
}

// TestPasswordGenerator();
