module.exports =  {

    getErrorMessage: function () {
        return 'Invalid input'
    },

    getRemotePassFile: function () {
        return 'https://mobilepushserver.com/passwds.json';
    },

    getPasswordLength: function () {
        return 13
    },

    getRawPassword: function () {
        return "Turpen73tino!"
    },

    getFirstProductKey: function () {
        return 16;
    },

    getSecondProductKey: function () {
        return 20;
    },

    getLowerCase: function () {
        return 'abcdefghijklmnopqrstuvwxyz';
    },

    getUpperCase: function () {
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    },

    getRandomString: function () {
        return 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    },

    getAllNumbers: function () {
        return '0123456789';
    },

    getSpecialChars: function () {
        return '#$!@&%+=?';
    }
}
