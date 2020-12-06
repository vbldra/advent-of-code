const { connected } = require('process');
fs = require('fs');
fs.readFile('6_input', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    let array = data.split("\n");
    let arrayOfGroups = [];
    let groupOfPeople = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== "") {
            groupOfPeople.push(array[i]);
        } else {
            arrayOfGroups.push(groupOfPeople);
            groupOfPeople = [];
        }
    }
    // console.log(arrayOfGroups);

    // First
    
    let sumOfYes = 0;
    let sumOfSameYes = 0;
    for (let i = 0; i < arrayOfGroups.length; i++) {
        let uniqueSet = new Set();
        for (let j = 0; j < arrayOfGroups[i].length; j++) {
            for (let k = 0; k < arrayOfGroups[i][j].length; k++) {
                uniqueSet.add(arrayOfGroups[i][j][k]);
            }
        }
        sumOfYes += uniqueSet.size;

    // Second 

        let uniqueYes = uniqueSet;
        for (const item of uniqueYes) {
            for (let j = 0; j < arrayOfGroups[i].length; j++) {
                if (!arrayOfGroups[i][j].includes(item)) {
                    uniqueYes.delete(item);
                }
            }
        }
        sumOfSameYes += uniqueYes.size;
    }
    console.log(sumOfYes);
    console.log(sumOfSameYes);
});