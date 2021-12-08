fs = require("fs");
fs.readFile("7_input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let arrayOfStrings = data.split(",");
  let sorted = arrayOfStrings.map(Number).sort((a, b) => a - b);
  // Creating array to store amount of fishes sorted by days from 0 to 8
  // console.log(sorted);

  function findFuel(numbers, num) {
    let currentFuel = 0;
    for (let j = 0; j < numbers.length; j++) {
      currentFuel = currentFuel + Math.abs(numbers[j] - num);
    }
    return currentFuel
  }

  function result(numbers) {
    let min = Math.min(...numbers);
    let max = Math.max(...numbers);
    let totalFuel = findFuel(numbers, min);
    let currentFuel = 0
    for (let i = min+1; i <= max; i++) {
      currentFuel = findFuel(numbers, i)
      
      if (currentFuel > totalFuel) {
        break;
      }
      totalFuel = currentFuel;
    }
    return totalFuel;
  }
  // result(sorted);
  console.log("---=== 1 task ===---");
  console.log("Minimum fuel: " + result(sorted));

  // Second task

  function findFuelProg(numbers, num) {
    let currentFuel = 0;
    for (let j = 0; j < numbers.length; j++) {
      let last = Math.abs(numbers[j]-num)
      let arr = [...Array(last+1).keys()]
      currentFuel = currentFuel + arr.reduce((acc, a)=>acc+a)
    }
    return currentFuel
  }

  function resultProg(numbers) {
    let min = Math.min(...numbers);
    let max = Math.max(...numbers);
    let totalFuel = findFuelProg(numbers, min);
    let currentFuel = 0
    for (let i = min+1; i <= max; i++) {
      currentFuel = findFuelProg(numbers, i)
      
      if (currentFuel > totalFuel) {
        break;
      }
      totalFuel = currentFuel;
    }
    return totalFuel;
  }
  console.log("---=== 2 task ===---");
  console.log("Minimum fuel: " + resultProg(sorted));

});
