const { log } = require('console');
const { connected, on } = require('process');
const { cursorTo } = require('readline');
fs = require('fs');
fs.readFile('11_input', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    let array = data.split("\n");
    
    // First
    let reL = /L/g;
    let occArray = array.map(element => element.replace(reL, "#"))
    let arr = occArray.map(element => addDot(element))
    function addDot(item) {
        let array = [...item];
        array.push(".");
        array.unshift(".");
        return array
    }
    let i = 0;
    let emp = [];
    while(i < arr[1].length) {
        emp.push(".");
        i++
    }
    arr.unshift(emp)
    arr.push(emp)


    function changeSeat(arrayToCheck) {
        let change = 0
        let original = JSON.parse(JSON.stringify(arrayToCheck));
        for (let i = 1; i < original.length-1; i++) {
            for (let j = 1; j < original.length-1; j++) {
                if (original[i][j] !== ".") {
                    let mapAround = [original[i-1][j-1], original[i-1][j], original[i-1][j+1], 
                    original[i][j-1], original[i][j+1],
                    original[i+1][j-1], original[i+1][j], original[i+1][j+1]];
                    let count = mapAround.filter(item => item === "#")
                    if (arrayToCheck[i][j] === "#" && count.length >= 4) {
                        arrayToCheck[i][j] = "L";
                        change ++
                    } else if (arrayToCheck[i][j] === "L" && count.length === 0) {
                        arrayToCheck[i][j] = "#";
                        change ++
                    }
                }
            }
        }
        if (change !== 0) {
            changeSeat(arrayToCheck);
        }
        return arrayToCheck;
    }

    function countSeats(arrayToCount) {
        let count = 0;
        arrayToCount.forEach(element => {
            let arrWithOcc = element.filter(item => item === "#");
            count += arrWithOcc.length;
        });
        return count;
    }
    
    let arrFinal = changeSeat(arr);
    console.log(countSeats(arrFinal));
    
});