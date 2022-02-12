# secure-password-utility
This password utility encourages the use of strong passwords in front-end applications.

To install this package, run npm i secure-password-utility

Usage
=====
Syntax: passwordCheck('yourSamplePassword',lengthOfPasswordString);
N.B. Ensure the length of the password you want to validate is at least 10-characters long.

In your TS/JS application:

const passwordCheck = require('secure-password-utility');

function SampleCall () {
    if(passwordCheck('retziwChanabd2?',15)) {
        console.log("secure password");
    } else {
        console.log("weak password);
    }
}