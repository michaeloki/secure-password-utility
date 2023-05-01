module.exports = {
    getCommonWords: () => {
        return [
            "pass", "123", "abc", "power",
            "qwerty", "000", "1q2w3e", "ashley",
            "michael", "daniel", "jessica", "111",
            "charlie", "liverpool", "chelsea", "arsenal",
            "manutd", "everton", "jordan", "thomas",
            "michelle", "nicole", "andrew", "joshua",
            "justin", "anthony", "jennifer", "robert",
            "matthew", "andrea", "hannah", "george",
            "wolves", "newcastle", "tottenham", "westham",
            "brighton", "barcelona", "rome", "bayern",
            "palace", "cardiff", "leicester", "gerrard",
            "fulham", "messi", "salah", "ronaldo",
            "mbappe", "london", "newyork", "tokyo",
            "africa", "europe", "asia", "america",
            "love", "baby", "dog", "angel",
            "sam", "anna", "cat", "alex",
            "leo", "apple", "ford", "honda", "news",
            "audi", "scorpio", "gemini", "haaland", "chatgpt", "sudan"
        ];
    },
    getPasswordLength: function () { return 13 },
    getRawPassword: () => {
        return "Turpen73tino!"
    },
    getFirstProductKey: () => {
        return 16;
    },
    getSecondProductKey: () => {
        return 20;
    },
    getLowerCase: () => {
        return 'abcdefghijklmnopqrstuvwxyz';
    },
    getUpperCase: () => {
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    },
    getRandomString: () => {
        return 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    },
    getAllNumbers: () => {
        return '0123456789';
    },
    getSpecialChars: () => {
        return '#$!@&%+=?';
    },
}



