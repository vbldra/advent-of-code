const { connected } = require('process');
fs = require('fs');
fs.readFile('2_input', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    
    let arrayOfPasswords = [];
    let arrayOfPasswords1 = data.split(`\n`);
    for (let i = 0; i < arrayOfPasswords1.length; i++) {
        arrayOfPasswords.push(arrayOfPasswords1[i].split(" "));
    }
    for (let i = 0; i < arrayOfPasswords.length; i++) {
        arrayOfPasswords[i][0] = arrayOfPasswords[i][0].split("-");
    }

    let howManyPass1 = 0;
    let howManyPass2 = 0;
    for (let i = 0; i < arrayOfPasswords.length; i++) {
        let letterToCheck = arrayOfPasswords[i][1].charAt(0);
        let stringToCheck = arrayOfPasswords[i][2];
        let num1 = arrayOfPasswords[i][0][0];
        let num2 = arrayOfPasswords[i][0][1];
        
        // First
        let count1 = 0;
        for (let i = 0; i < stringToCheck.length; i++) {
            if(stringToCheck[i] === letterToCheck) {
                count1++;
            }
        }
        if (count1 >= num1 && count1 <= num2) {
            howManyPass1++;
        }

        // Second
        let passedTest = 0;
        if(stringToCheck[num1 - 1] === letterToCheck) {
            passedTest++;
        }
        if(stringToCheck[num2 - 1] === letterToCheck) {
            passedTest++;
        }
        if(passedTest === 1) {
            howManyPass2++;
        }
    }
    console.log(howManyPass1);
    console.log(howManyPass2);
});
  
