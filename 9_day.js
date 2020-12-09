const { connected } = require('process');
const { cursorTo } = require('readline');
fs = require('fs');
fs.readFile('9_input', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    let arrayStr = data.split("\n");
    let array = arrayStr.map(value => Number(value))
    
    // First
    let step = 25;
    let errorSum;
    function checkSum(array, sum) {
        let count = 0;
        array.forEach((element, index) => {
            let sub = sum - element;
            let newArray = array.map((i, j) => j != index ? i : null)
            if (newArray.includes(sub)) {
                count ++
            }
        });
        if (!count) {
            errorSum = sum
            return console.log(errorSum)
        } 
    }
    for (let i = 0; i < array.length; i++) {
        let currentArray = array.slice(i, i + step)
        let currentSum = array[i + step]
        if (currentSum) {
            checkSum(currentArray, currentSum)
        }
    }

    // Second
    for (let i = 0; i < array.length; i++) {
        let sum = 0;
        let currentI = i
        let finalArray = [];
        do {
            finalArray.push(array[currentI])
            sum += array[currentI];
            currentI ++
            if (sum === errorSum){
                let answer = Math.min(...finalArray) + Math.max(...finalArray)
                console.log(answer)
                break
            }
        } while (sum <= errorSum);
    }

});