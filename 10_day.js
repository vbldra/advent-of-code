const { connected, on } = require('process');
const { cursorTo } = require('readline');
fs = require('fs');
fs.readFile('10_input', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    let arrayStr = data.split("\n");
    let array = arrayStr.map(value => Number(value))
    
    // First
    let arraySort = array.sort((a, b) => a - b)
    arraySort.push(arraySort[arraySort.length-1] + 3);
    
    let one = 0;
    let two = 0;
    let three = 0;

    function findArray(array) {
        if(array[0] + 1 === array[1]) {
            one ++
            findArray(array.slice(1));
        }
        if(array[0] + 2 === array[1]) {
            two ++
            findArray(array.slice(1));
        }
        if(array[0] + 3 === array[1]) {
            three ++
            findArray(array.slice(1));
        }
        return one * three
    }
   
    console.log(findArray(arraySort))

    // Second

    // arraySort.unshift(0)
    // arraySort.pop()
    // let count = 0;
    // for (let i = arraySort.length - 3; i >= 0; i--) {
    //     let arrayRest = arraySort.slice(i+1, i+4)
    //     console.log(arrayRest)
    //     let currentCount = 0
    //     for (let j = 0; j < arrayRest.length; j++) {
    //         if (arrayRest[j]-arraySort[i] === 1) {
    //             currentCount ++;
    //         }
    //         if (arraySort[j]-arraySort[i] === 2) {
    //             currentCount ++;
    //         }
    //         if (arraySort[j]-arraySort[i] === 3) {
    //             currentCount ++;
    //         }
    //     }
    //     count = count + currentCount
        
        
        
    // }
    // console.log(count)

});