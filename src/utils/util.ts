let passwordLength;

module.exports = {
    inputValidator(userPasswordLength) {
        try {
            passwordLength = typeof String ? parseInt(userPasswordLength) : userPasswordLength;
        } catch (exception) {
            return allConstants.getErrorMessage();
        }
        return passwordLength;
    },
    stringCaster(stringArg) {
        try {
            stringArg = typeof String ? stringArg.toString() : stringArg;
        } catch (exception) {
            return allConstants.getErrorMessage();
        }
        return stringArg;
    }
}
