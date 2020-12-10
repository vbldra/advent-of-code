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
    arraySort.unshift(0)
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
   
    console.log(findArray(arraySort, 1))

    // Second
    


});