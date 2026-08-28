/**
 * Bundled list of common passwords and dictionary fragments used by
 * weakPasswordChecker. Replaces the previous remote wordlist fetch so the
 * check works offline, deterministically, and never fails open.
 */
export const COMMON_PASSWORDS: string[] = [
    '123456', 'password', 'passkey', 'passwd', '123456789', '12345678', '12345', 'qwerty', 'abc123',
    'football', 'monkey', 'letmein', 'dragon', '111111', 'baseball', 'iloveyou',
    'trustno1', 'sunshine', 'master', 'welcome', 'shadow', 'ashley', 'michael',
    'ninja', 'mustang', 'jennifer', 'jordan', 'superman', 'hunter', 'freedom',
    'whatever', 'qazwsx', 'starwars', 'london', 'garcia', 'anthony', 'victoria',
    'charlie', 'donald', 'daniel', 'hannah', 'thomas', 'robert', 'sarah',
    'jessica', 'amanda', 'matthew', 'access', 'flower', 'hello', 'ranger',
    'thunder', 'tigger', 'robert', 'soccer', 'hockey', 'killer', 'george',
    'sexy', 'andrew', 'charlie', 'joshua', 'maggie', 'snowball', 'summer',
    'winter', 'spring', 'autumn', 'admin', 'login', 'guest', 'root', 'test',
    'passw0rd', 'p@ssword', 'secret', 'purple', 'orange', 'silver', 'golden',
    'diamond', 'ferrari', 'porsche', 'mercedes', 'corvette', 'bmw', 'harley',
    'yamaha', 'honda', 'toyota', 'nissan', 'cheese', 'coffee', 'chocolate',
    'cookie', 'pepper', 'bacon', 'banana', 'apple', 'orange', 'grape',
    'cherry', 'lemon', 'melon', 'kiwi', 'mango', 'papaya', 'guava',
    'computer', 'laptop', 'keyboard', 'monitor', 'printer', 'internet',
    'website', 'google', 'facebook', 'twitter', 'instagram', 'whatsapp',
    'netflix', 'amazon', 'appleid', 'icloud', 'gmail', 'outlook', 'yahoo',
    'spotify', 'paypal', 'bitcoin', 'blockchain', 'ethereum', 'wallet',
    'qwertyuiop', 'asdfghjkl', 'zxcvbnm', 'poiuytrewq', 'lkjhgfdsa',
    'mnbvcxz', '1q2w3e4r', '1qaz2wsx', 'zaq12wsx', 'qweasdzxc',
    'aaaaaa', 'bbbbbb', 'cccccc', 'dddddd', 'eeeeee', 'ffffff',
    'zzzzzz', 'qqqqqq', 'xxxxxx', 'wwwwww', 'tttttt',
    'aaa', 'zzz', 'qqq', 'xxx', 'www', 'asd', 'zxc', 'qwe',
    'lovely', 'loveme', 'family', 'friend', 'happy', 'smile', 'kisses',
    'princess', 'prince', 'queen', 'king', 'crown', 'castle', 'knight',
    'angel', 'heaven', 'jesus', 'allah', 'buddha', 'church', 'bible',
    'school', 'college', 'university', 'student', 'teacher', 'professor',
    'doctor', 'nurse', 'engineer', 'lawyer', 'police', 'fireman',
    'baseball', 'basketball', 'tennis', 'golfing', 'cricket', 'rugby',
    'chelsea', 'arsenal', 'barcelona', 'realmadrid', 'manchester',
    'liverpool', 'juventus', 'milan', 'bayern', 'borussia',
    'pokemon', 'minecraft', 'fortnite', 'gaming', 'player', 'xbox',
    'playstation', 'nintendo', 'warcraft', 'legend', 'zelda', 'mario',
    'batman', 'superman', 'spiderman', 'ironman', 'captain', 'avengers',
    'harrypotter', 'hogwarts', 'gandalf', 'frodo', 'aragorn', 'legolas',
    'jackson', 'smith', 'johnson', 'williams', 'brown', 'jones', 'miller',
    'davis', 'wilson', 'anderson', 'taylor', 'moore', 'white', 'harris',
    'martin', 'thompson', 'young', 'walker', 'hall', 'allen', 'king',
    'wright', 'scott', 'green', 'baker', 'adams', 'nelson', 'hill',
    'ramsey', 'oliver', 'jack', 'harry', 'jacob', 'alfred', 'arthur',
    'patrick', 'richard', 'edward', 'ronaldo', 'messi', 'neymar', 'mbappe',
    'serena', 'venus', 'usain', 'tiger', 'woods', 'phelps', 'bolt',
    'january', 'february', 'march', 'april', 'may', 'june', 'july',
    'august', 'september', 'october', 'november', 'december',
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday',
    'sunday', 'january', 'mercury', 'venus', 'earth', 'mars', 'jupiter',
    'saturn', 'uranus', 'neptune', 'pluto', 'galaxy', 'nebula', 'comet'
];

const LOWERCASE_COMMON_PASSWORDS = COMMON_PASSWORDS.map((word) => word.toLowerCase());

/** Returns true when the password contains a known common word/fragment (>= 3 chars). */
export function containsCommonWord(password: string, additionalWords?: string[]): boolean {
    const lowercased = password.toLowerCase();
    if (additionalWords && additionalWords.length > 0) {
        for (const word of additionalWords) {
            const candidate = word.toLowerCase();
            if (candidate.length >= 3 && lowercased.includes(candidate)) {
                return true;
            }
        }
    }
    return LOWERCASE_COMMON_PASSWORDS.some(
        (word) => word.length >= 3 && lowercased.includes(word)
    );
}
