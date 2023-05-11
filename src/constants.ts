module.exports =  {

    getRemotePassFile() {
        return 'https://mobilepushserver.com/passwds.json';
    },

    getPasswordLength() {
        return 13
    },

    getRawPassword() {
        return "Turpen73tino!"
    },

    getFirstProductKey() {
        return 16;
    },

    getSecondProductKey() {
        return 20;
    },

    getLowerCase() {
        return 'abcdefghijklmnopqrstuvwxyz';
    },

    getUpperCase() {
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    },

    getRandomString() {
        return 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    },

    getAllNumbers() {
        return '0123456789';
    },

    getSpecialChars() {
        return '#$!@&%+=?';
    }
}
