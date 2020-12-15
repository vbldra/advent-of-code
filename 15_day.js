const ARRAY = [0,13,1,8,6,15];
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
}

console.log(currentNumber);
