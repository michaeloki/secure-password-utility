# secure-password-utility
This NodeJS-password utility encourages the use of strong passwords in front-end applications.

To install this package, run npm i secure-password-utility.

When you call `weakPasswordChecker` you will get a boolean value.

Weak passwords like `Passkey!@#41` or common words will also return false.

The `weakPasswordChecker` function will validate your input by ensuring that the password length is more than 11.
It also confirms that the input contains a number and the combination of a special character,lowercase and uppercase.

Once you display the conditions in your UI, this function will enforce the validation.

# Quick Setup
Install the plugin using `npm i secure-password-utility`
In your
Node/Angular/React/Vue application:
Install 'Types' plugin by running npm i -D @types/node
Include
`"types": [
"node"
],`in your tsconfig.json file and restart your IDE.

# Usage
*Validate password strength
Syntax: securePasswordUtility.weakPasswordChecker('yourSamplePassword', lengthOfYourPassword);
N.B. Ensure the length of the password you want to validate is at least 12-characters long.

*Generate a strong password
Syntax: securePasswordUtility.createStrongPassword(lengthOfYourPassword);
N.B. The password length must be more than 12.

*Generate a product key
Syntax: securePasswordUtility.productKeyGenerator(lengthOfYourProductKey);
N.B. The password length must be a multiple of 4 or 5 between 16 and 100 e.g. 16 or 25


````
const securePasswordUtility = require('secure-password-utility'); // Add this in your top-level class or file

````

````
async function SampleCall () {
    let passwordStrength = false;
    await securePasswordUtility.weakPasswordChecker('k%&%N8Ey4$Yx$Fp$A8', 18)
        .then((response) => {
            passwordStrength = response
    })
    if(passwordStrength) {
        console.log("secure password");
    } else {
        console.log("weak password");
    }
}
````

````

async function SamplePasswordCreator () {     
    let generatedPassword;
       await securePasswordUtility.createStrongPassword(16).then((response) => {
            generatedPassword = response;
       })
    console.log("Your autogenerated password is ", generatedPassword);
}
````

````

function SampleProductKeyGenerator () {
     const generatedPassword = securePasswordUtility.productKeyGenerator(24);
     console.log("Your product key is ", generatedPassword);
}
````

````

function BatchProductKeyGenerator () {
     const generatedPassword = securePasswordUtility.batchProductKeyGenerator(25, 100);
     console.log("Your product key is ", generatedPassword);
}
````


Buy me a  ☕
https://www.paypal.com/paypalme/inspirati
