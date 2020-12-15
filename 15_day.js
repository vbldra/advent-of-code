let ARRAY = [0,13,1,8,6,15];
let gameArray = [...ARRAY];
let countIndex = 2020;
let currentNumber = gameArray[gameArray.length-1];

function countNextStep(index, currentNumber, array) {
    for (let j = array.length-2; j >= 0 ; j--) {
        if (array[j] === currentNumber) {
            return index - j;
        }
    }
    return 0
}

for (let i = gameArray.length; i < countIndex; i++) {
    currentNumber = countNextStep(i - 1, currentNumber, gameArray);
    gameArray.push(currentNumber);
    if (i % 10000 === 0) {
        console.log(i);
    }
}

console.log(currentNumber);

// 2

let gameObj = {};
for (let i = 0; i < ARRAY.length - 1; i++) {
    gameObj[ARRAY[i]] = i;
}

countIndex = 30000000 - 1;

function countNextStep(index, currentNumber, obj) {
    if (Object.hasOwnProperty.call(obj, currentNumber)) {
        return index - obj[currentNumber];
    }
    return 0;
}

currentNumber = ARRAY[ARRAY.length-1]

for (let i = ARRAY.length-1; i < countIndex; i++) {
    let nextNumber = countNextStep(i, currentNumber, gameObj);
    gameObj[currentNumber] = i;
    currentNumber = nextNumber
    if (i % 500000 === 0) {
        console.log(i);
    }
}

console.log(currentNumber);
