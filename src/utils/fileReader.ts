const fs = require('fs').promises;

export class SecureFileReader {
     async readFile(rawPassword: string) {
        let passwordResponse = false;
        try {
            const data = await fs.readFile('src/assets/passwds.json');
            const obj = JSON.parse(data);
            obj.forEach((text=> {
                if(rawPassword.toLowerCase().includes(text) && text.length>=3) {
                    passwordResponse = true;
                }
            }));
        } catch (error:any) {
            console.log(`SecurePasswordUtility::: Got an error trying to read the file: ${error.message}`);
        }
        console.log('final rep is ',passwordResponse);
        return passwordResponse;
    }
}
