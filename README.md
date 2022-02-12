# secure-password-utility
This password utility encourages the use of strong passwords in front-end applications.

To install this package, run npm i secure-password-utility.

When you call WeakPasswordChecker you will get a boolean value.

Weak passwords like password123 or common words will also return false.

The WeakPasswordChecker function will validate your input by ensuring that the password length is more than 9.
It also confirms that the input contains a number and the combination of a special character,lowercase and uppercase.

Once you display the conditions in your UI, this function will enforce the validation.

Usage
=====
Syntax: passwordCheck('yourSamplePassword',lengthOfPasswordString);
N.B. Ensure the length of the password you want to validate is at least 10-characters long.


In your TS/JS application:


````
const passwordCheck = require('secure-password-utility');
function SampleCall () {
    if(passwordCheck.WeakPasswordChecker('retziwChanabd2?',15)) {
        console.log("secure password");
    } else {
        console.log("weak password");
    }
}
````
