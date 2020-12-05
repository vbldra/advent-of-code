const { connected } = require('process');
fs = require('fs');
fs.readFile('4_input', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }

    const array = data.split("\n");
    array.push("");
    let arrayOfData = [];
    let onePass = []
    for (let i = 0; i < array.length; i++) {
        if(array[i] !== "") {
            onePass.push(array[i]);
        } else {
            arrayOfData.push(onePass.join(" "));
            onePass = [];
        }
    }

    // First part

    let validPassports = 0;
    let arrayOfValidPassports = [];
    let arrayOfTags = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    let lengthOfTags = arrayOfTags.length
    for (let i = 0; i < arrayOfData.length; i++) {
        let matches = 0;
        for (let j = 0; j < arrayOfTags.length; j++) {
            if (arrayOfData[i].includes(arrayOfTags[j])){
                matches ++;
            } else {
                break;
            }
        }
        if (matches === lengthOfTags) {
            validPassports ++;
            arrayOfValidPassports.push(arrayOfData[i]);
        }
    }
    console.log(validPassports);

    // Second

    let validPassportsNew = 0;
    for (let i = 0; i < arrayOfValidPassports.length; i++) {
        let valid = 0;
        for (let j = 0; j < arrayOfTags.length; j++) {
            let indexOf = arrayOfValidPassports[i].indexOf(arrayOfTags[j]);
            let stringToCheck;
            if (j === 0) {
                stringToCheck = Number(arrayOfValidPassports[i].slice(indexOf+4, indexOf+9));
                if (stringToCheck >= 1920 && stringToCheck <= 2002) {
                    valid ++;
                } else {
                    break;
                };
            }
            if (j === 1) {
                stringToCheck = Number(arrayOfValidPassports[i].slice(indexOf+4, indexOf+9));
                if (stringToCheck >= 2010 && stringToCheck <= 2020) {
                    valid ++;
                } else {
                    break;
                };
            }
            if (j === 2) {
                stringToCheck = Number(arrayOfValidPassports[i].slice(indexOf+4, indexOf+9));
                    if (stringToCheck >= 2020 && stringToCheck <= 2030) {
                        valid ++;
                    } else {
                        break;
                    };
            }
            if (j === 3) {
                stringToCheck = arrayOfValidPassports[i].slice(indexOf+4, indexOf+9);
                if (stringToCheck.includes("cm")) {
                    let num = stringToCheck.slice(0, 3)
                    if (num >= 150 && num <= 193) {
                        valid ++;
                    } else {
                        break;
                    };
                } else if (stringToCheck.includes("in")) {
                    let num = stringToCheck.slice(0, 2)
                    if (num >= 59 && num <= 76) {
                        valid ++;
                    } else {
                        break;
                    };
                }   
            }
            if (j === 4) {
                stringToCheck = arrayOfValidPassports[i].slice(indexOf+4, indexOf+12);
                let regEx = /#[0-9A-Fa-f]{6}/g;
                if (regEx.test(stringToCheck)) {
                    valid ++;
                } else {
                    break;
                };
            }
            if (j === 5) {
                stringToCheck = arrayOfValidPassports[i].slice(indexOf+4, indexOf+8);
                if (/amb|blu|brn|gry|grn|hzl|oth/.test(stringToCheck)) {
                    valid ++;
                } else {
                    break;
                }
            }
            if (j === 6) {
                stringToCheck = (arrayOfValidPassports[i].slice(indexOf+4, indexOf+4+10)).trim();
                if (stringToCheck.length === 9 && Number(stringToCheck)) {
                    valid ++;
                } else {
                    break;
                };
            }
        }
        if (valid === arrayOfTags.length) {
            validPassportsNew++;
        }        
    }
    console.log(validPassportsNew);
});
  

