const { connected } = require('process');
fs = require('fs');
fs.readFile('1_input', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    
    let arrayOfStrings = data.split(`\n`);
    
    let arrayOfNumbers = [];
    // Converting array of string to array of numbers
    for (let i = 0; i < arrayOfStrings.length; i++) {
        arrayOfNumbers.push(Number(arrayOfStrings[i]))
    }

    // First task
    function findSumOfTwo2020(array) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 1; j < array.length; j++) {
                if (array[i] + array[j] === 2020) {
                    console.log(array[i], array[j])
                    return (array[i] * array[j])
                }
            }
        }
    }
    console.log(findSumOfTwo2020(arrayOfNumbers));
    
    // Second task
    function findSumOfThree2020(array) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 1; j < array.length; j++) {
                for (let h = 2; h < array.length; h++) {
                    if (array[i] + array[j] + array[h] === 2020) {
                        console.log(array[i], array[j], array[h]);
                        return (array[i] * array[j] * array[h]);
                    }
                }
            }
        }
    }
    console.log(findSumOfThree2020(arrayOfNumbers));
});
  





