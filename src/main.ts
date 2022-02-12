const allConstants = require('./constants.ts');

module.exports = {
    WeakPasswordChecker: function (rawPassword, passwordLength) {
        let status = true;

        try {
            if (!rawPassword || !passwordLength) {
                return !status;
            } else {
                try {
                    if (!(passwordLength === rawPassword.length && passwordLength >= 10)) {
                        return !status;
                    } else {
                        allConstants.getCommonWords().forEach((word) => {
                            if (rawPassword.includes(word)) {
                                status = false;
                            }
                        });

                        if (status) {
                            // check if it contains special characters, digit, small and capital letters
                            const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
                            if (!rawPassword.match(regExp)) {
                                status = false;
                            }
                        }
                        return status;
                    }
                } catch (e) {
                    console.log("SecurePasswordUtility::: ", e.message);
                }
            }
        } catch (e) {
            console.log("SecurePasswordUtility::: ", e.message);
            return status;
        }
    }
}
