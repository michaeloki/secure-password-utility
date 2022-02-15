
const passwordCheck = require('./main')

function TestPasswordGenerator() {
    console.log(passwordCheck.CreateStrongPassword(16));
    console.log(passwordCheck.WeakPasswordChecker("a7YT@123bR",10));
}

//TestPasswordGenerator();
