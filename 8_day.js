const { connected } = require('process');
const { cursorTo } = require('readline');
fs = require('fs');
fs.readFile('8_input', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    
    // First
    let array = data.split("\n");
    let instructions = [];
    for (let i = 0; i < array.length; i++) {
        let current = array[i].split(" ")
        let newArr = [current[0], Number(current[1])]
        instructions.push(newArr);
    }
    
    let last = instructions.length - 1
    
    function getValueOfAccumulator(array) {
        let arrayCopy = JSON.parse(JSON.stringify(array))
        let currentStep = 0;
        let acc = 0;
        while (currentStep <= last && !arrayCopy[currentStep].includes("+")) {
            if (arrayCopy[currentStep][0] === "nop") {
                arrayCopy[currentStep].push("+");
                currentStep += 1;
            } else if (arrayCopy[currentStep][0] === "acc") {
                arrayCopy[currentStep].push("+");
                acc += arrayCopy[currentStep][1];
                currentStep += 1;
            } else {
                arrayCopy[currentStep].push("+");
                currentStep += arrayCopy[currentStep][1];
            }
        } ;
        if (currentStep > last) {
            return `Second - ${acc}`
        }
        return `First - ${acc}`
    }
    
    console.log(getValueOfAccumulator(instructions))


    // Second
    
    let newArray = JSON.parse(JSON.stringify(instructions))
    for (let i = 0; i < newArray.length; i++) {
        newArray = JSON.parse(JSON.stringify(instructions))
        if (newArray[i][0] === "nop") {
            newArray[i][0] = "jmp";
            let check = getValueOfAccumulator(newArray)
            if (check.includes("Second")) {
                console.log(getValueOfAccumulator(newArray));
            }
        } else if (newArray[i][0] === "jmp") {
            newArray[i][0] = "nop"
            let check = getValueOfAccumulator(newArray)
            if (check.includes("Second")) {
                console.log(getValueOfAccumulator(newArray));
            }
        }
    }

});