import {AppConstants} from "./constants";

export class SecurePasswordUtility {
    allConstants = new AppConstants();

    async weakPasswordChecker(rawPassword: string, passwordLength: number) {

        let status = true;
        const fileResult = new Set();

        try {
            if (!rawPassword || !passwordLength) {
                status = false;
            } else {
                try {
                    if (!(passwordLength === rawPassword.length && passwordLength >= 12)) {
                        status = false;
                    } else {
                        await fetch(this.allConstants.remotePassFile)
                            .then((response) => response.json())
                            .then(
                                (json) => json.forEach((word:string) => {
                                            if (rawPassword.toLowerCase().includes(word) && word.toString().toLowerCase().length >= 3) {
                                                fileResult.add(true);
                                            }
                                })
                            );
                                if (fileResult.size>0) {
                                    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/;
                                    if (!pattern.test(rawPassword)) {
                                        status = false;
                                        fileResult.add(true);
                                    }
                                }
                    }
                } catch (exception: any) {
                    console.log("SecurePasswordUtility::: ", exception.message);
                }
            }
        } catch (exception: any) {
            console.log("SecurePasswordUtility::: ", exception.message);
        }
        if(fileResult.size>0) {
            status = false;
        }
        return status
    }

    strongPasswordGenerator(passwordLength: any) {
        let uCaseLength = 0;
        let lCaseLength = 0;
        let nCaseLength = 0;
        let cCaseLength = 0;
        let remainder = 0;

        let autoGeneratedPassword = "", upperCaseGenerator = "", lowerCaseGenerator = "";
        let numericGenerator = "", characterGenerator = "", optionalCharacter = "", scrambledPassword = "";

        if (passwordLength.isNaN || passwordLength <= 11) {
            return "Invalid input";
        }
        if ((parseInt(passwordLength) % 4 !== 0)) {
            remainder = parseInt(passwordLength) % 4;
            uCaseLength = (passwordLength - remainder) / 4;
            lCaseLength = (passwordLength - remainder) / 4;
            nCaseLength = (passwordLength - remainder) / 4;
            cCaseLength = (passwordLength - remainder) / 4;
        } else {
            uCaseLength = passwordLength / 4;
            lCaseLength = passwordLength / 4;
            nCaseLength = passwordLength / 4;
            cCaseLength = passwordLength / 4;
        }


        for (let i = 0; i < uCaseLength; i++) {
            upperCaseGenerator += this.allConstants.getUpperCase().charAt(Math.floor(Math.random() *
                this.allConstants.getUpperCase().length));
        }

        for (let j = 0; j < lCaseLength; j++) {
            lowerCaseGenerator += this.allConstants.getLowerCase().charAt(Math.floor(Math.random() *
                this.allConstants.getLowerCase().length));
        }

        for (let k = 0; k < nCaseLength; k++) {
            numericGenerator += this.allConstants.getAllNumbers().charAt(Math.floor(Math.random() *
                this.allConstants.getAllNumbers().length));
        }

        for (let z = 0; z < cCaseLength; z++) {
            characterGenerator += this.allConstants.getSpecialChars().charAt(Math.floor(Math.random() *
                this.allConstants.getSpecialChars().length));
        }

        scrambledPassword = upperCaseGenerator + lowerCaseGenerator + numericGenerator + characterGenerator;

        if (remainder !== 0) {
            for (let x = 0; x < remainder; x++) {
                optionalCharacter += this.allConstants.getRandomString().charAt(Math.floor(Math.random() *
                    this.allConstants.getRandomString().length));
            }
            scrambledPassword = scrambledPassword.toString().concat(optionalCharacter);
            return this.completePasswordGeneration(passwordLength, autoGeneratedPassword, scrambledPassword);
        } else {
            return this.completePasswordGeneration(passwordLength, autoGeneratedPassword, scrambledPassword);
        }
    }

    completePasswordGeneration(passwordLength: number, autoGeneratedPassword: any, scrambledPassword: string) {
        for (let b = 0; b < passwordLength; b++) {
            autoGeneratedPassword += scrambledPassword.charAt(Math.floor(Math.random() *
                scrambledPassword.length));
        }
        return autoGeneratedPassword;
    }

    async createStrongPassword(codeLength: number) {
        if (codeLength <= 11 || codeLength >= 50) {
            return "Invalid input";
        }
        let createNewPassword = this.strongPasswordGenerator(codeLength);

        await this.weakPasswordChecker(createNewPassword, codeLength).then((result) => {
            if (!result) {
                return createNewPassword;
            } else {
                createNewPassword = this.createStrongPassword(codeLength);
            }
        })
        return this.strongPasswordGenerator(codeLength);
    }

    productKeyGenerator(productKeyLength: number) {
        let generatedProductKey = "";
        let finalGeneratedProductKey = "";
        let modulusSum = 0;
        if (productKeyLength >= 16 && productKeyLength <= 100
            && (productKeyLength % 4 === 0 || productKeyLength % 5 === 0)) {
            const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456890';
            for (let i = 0; i < productKeyLength; i++) {
                generatedProductKey += upperCase.charAt(Math.floor(Math.random() *
                    upperCase.length));
            }
            if ((productKeyLength % 5 === 0 && productKeyLength % 4 === 0) || productKeyLength % 5 === 0) {
                for (let k = 0; k < productKeyLength; k++) {
                    modulusSum = k + 1;
                    if (modulusSum % 5 === 0) {
                        finalGeneratedProductKey += generatedProductKey.substring(k - 4, k + 1) + "-";
                    }
                }
            }
            if (productKeyLength % 4 === 0 && productKeyLength % 5 !== 0) {
                for (let l = 0; l < productKeyLength; l++) {
                    modulusSum = l + 1;
                    if (modulusSum % 4 === 0) {
                        finalGeneratedProductKey += generatedProductKey.substring(l - 3, l + 1) + "-";
                    }
                }
            }
        }
        finalGeneratedProductKey = finalGeneratedProductKey.substring(0, finalGeneratedProductKey.length - 1);
        return finalGeneratedProductKey;
    }
}
