import * as fs from "fs";
import {AppConstants} from "../constants";
export class SecureFileReader {
    //appConstants = new AppConstants();


    saveData(data:boolean) {
        return data;
    }

     readFile(rawPassword: string) {
         let tempState;// = false;
         try {
               fs.readFile('src/assets/passwds.json', function (err, data) {
                 if (err) {
                     return console.error(err);
                 }
                 const obj = JSON.parse(data.toString());
                 for (const text in obj) {
                     if (rawPassword.toLowerCase().includes(obj[text]) && obj[text].toString().toLowerCase().length >= 3) {
                         //return true;
                         tempState = true;
                         // console.log('tempState ', tempState);

                     }
                 }
                 console.log('see tempstate ', tempState);
                 return tempState;
                 // obj.forEach((text => {
                 //     if (rawPassword.toLowerCase().includes(text) && text.length >= 3) {
                 //         console.log('rawpppp ==>>> ', text);
                 //         tempState = true;
                 //         return true;
                 //     }
                 // }));
             });
            /// this.appConstants.getPasswordState();
        } catch (error:any) {
            console.log(`SecurePasswordUtility::: Got an error trying to read the file: ${error.message}`);
        }
         console.log('i gotttt ', tempState);
        return tempState;
    }
}
