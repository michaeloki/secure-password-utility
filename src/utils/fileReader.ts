const fs = require('fs').promises;

export class SecureFileReader {
     async readFile(rawPassword: string) {
        let passwordResponse = false;
        try {
            const data = await fs.readFile('src/assets/passwds.json');
            const obj = JSON.parse(data);
            obj.forEach((e => {
                if(rawPassword.toLowerCase().includes(e) && e.length>=3) {
                    passwordResponse = true;
                }
            }));
        } catch (error) {
            console.error(`SecurePasswordUtility::: Got an error trying to read the file: ${error.message}`);
        }
        console.log('final rep is ',passwordResponse);
        return passwordResponse;
    }
}
