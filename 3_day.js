const { connected } = require("process");
fs = require("fs");
fs.readFile("3_input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let arrayOfStrings = data.split(`\n`);

  // First task
  function findBigCriteria(array) {
    let countOne = new Array(array[0].length).fill(0);
    let arrayWithOne = [];
    let arrayWithZero = [];
    let arrayEqual = [];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if (array[i][j] === "1") {
          countOne[j]++;
        }
      }
    }
    countOne.map((el) => {
      if (el > array.length / 2) {
        arrayWithOne.push(1);
        arrayWithZero.push(0);
      } else if (el < array.length / 2) {
        arrayWithOne.push(0);
        arrayWithZero.push(1);
      } else {
        arrayEqual.push(0);
      }
    });
    return [arrayWithOne, arrayWithZero, arrayEqual];
  }

  function submarinePower(array) {
    let [gammaRate, epsilonRate] = findBigCriteria(array);
    return parseInt(gammaRate.join(""), 2) * parseInt(epsilonRate.join(""), 2);
  }
  console.log("---=== 1 task ===---");
  console.log("Multiply: " + submarinePower(arrayOfStrings));

  // Second task
  function submarineLifeRating(array) {
    let copyArray = array;
    let arrayToCheckOxygen = [...copyArray];
    let arrayToCheckCo2 = [...copyArray];

    function checkingOxygen(arr) {
      for (let i = 0; i < array[0].length; i++) {
        let numberToCheck = [];
        arr.map((el) => numberToCheck.push(el[i]));
        let checks = findBigCriteria(numberToCheck);
        if (arr.length > 1) {
          if (checks[0] == 1) {
            arr = arr.filter((el) => el[i] == 1);
          } else if (checks[1] == 1) {
            arr = arr.filter((el) => el[i] == 0);
          } else {
            arr = arr.filter((el) => el[i] == 1);
          }
        }
      }
      return arr;
    }
    function checkingCo2(arr) {
      for (let i = 0; i < array[0].length; i++) {
        let numberToCheck = [];
        arr.map((el) => numberToCheck.push(el[i]));
        let checks = findBigCriteria(numberToCheck);
        if (arr.length > 1) {
          if (checks[0] == 1) {
            arr = arr.filter((el) => el[i] == 0);
          } else if (checks[1] == 1) {
            arr = arr.filter((el) => el[i] == 1);
          } else {
            arr = arr.filter((el) => el[i] == 0);
          }
        }
      }
      return arr;
    }
    let oxygen = checkingOxygen(arrayToCheckOxygen)
    let co2 = checkingCo2(arrayToCheckCo2)

    return parseInt(oxygen.join(""), 2) * parseInt(co2.join(""), 2);
  }
  console.log("---=== 2 task ===---");
  console.log("Multiply: " + submarineLifeRating(arrayOfStrings));
});
