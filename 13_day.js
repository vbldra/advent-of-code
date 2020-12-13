const { log } = require('console');
const { connected, on } = require('process');
const { cursorTo } = require('readline');
fs = require('fs');
fs.readFile('13_input', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    let array = data.split("\n");
    array.pop()

    
    // First
    let timeNow = Number(array[0]);
    let buses = array[1].split(",");
    buses = buses.filter(element => element !== "x");
    buses = buses.map(element => Number(element));
    
    let nextBus = buses.map(element => Math.ceil(timeNow / element) * element)
    let numberOfBus = buses[nextBus.indexOf(Math.min(...nextBus))];
    let answer = (Math.min(...nextBus) - timeNow) * numberOfBus
    console.log(answer)
   
});