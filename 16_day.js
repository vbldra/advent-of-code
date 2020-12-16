const { log } = require('console');
const { connected, on } = require('process');
const { cursorTo } = require('readline');
fs = require('fs');
fs.readFile('16_input', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    let array = data.split("\n");
    array.pop()
    let nearbyArr = []
    let yourArr = []
    let range = []
   
    for (let i = 0; i < array.length; i++) {
        if (array[i]) {
            let currentValue;
            if (array[i].includes("or")) {
                currentValue = array[i].split(" ");
                currentValue.shift();
                currentValue.splice(1,1);
                range.push(currentValue[0].split("-"));
                range.push(currentValue[1].split("-"))
            }
            if (array[i].includes("your")) {
                yourArr.push(...array[i + 1].split(","));
            }
            if (array[i].includes("nearby")) {
                let nearby = [];
                for (let j = i + 1; j < array.length; j++) {
                    nearby.push(array[j]);
                }
                nearbyArr.push(...nearby.join(",").split(","));
            }
        }
    }
    let rangeNum = range.map((value) => {
        return value = value.map(num => Number(num))
    });
    let nearbyArrNum = nearbyArr.map(value => Number(value)); 
    let sumOfWrongNum = 0
    for (let i = 0; i < nearbyArrNum.length; i++) {
        let countNotInRange = 0
        for (let j = 0; j < rangeNum.length; j++) {
            if (nearbyArrNum[i] >= rangeNum[j][0] && nearbyArrNum[i] <= rangeNum[j][1]) {
                countNotInRange ++
            }
        }
        if (countNotInRange === 0) {
            sumOfWrongNum += nearbyArrNum[i]
        }
    }
    console.log(sumOfWrongNum)
});