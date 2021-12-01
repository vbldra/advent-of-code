const { connected } = require("process");
fs = require("fs");
fs.readFile("1_input", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let arrayOfStrings = data.split(`\n`);
  let arrayOfNumbers = [];
  // Converting array of string to array of numbers
  for (let i = 0; i < arrayOfStrings.length; i++) {
    arrayOfNumbers.push(Number(arrayOfStrings[i]));
  }

  // First task
  function lagerMeasurements(array) {
    let measurements = {
      decreased: 0,
      increased: 0,
    };
    for (let i = 1; i < array.length; i++) {
      if (array[i] < array[i - 1]) {
        measurements["decreased"]++;
      } else if (array[i] > array[i - 1]) {
        measurements["increased"]++;
      } 
    }
    console.log(measurements);
    let values = Object.values(measurements);
    return Math.max(...values);
  }
  console.log("---=== 1 task ===---");
  console.log("Maximum: " + lagerMeasurements(arrayOfNumbers));

  // Second task
  function lagerSumMeasurements(array) {
    let arrayOfSum = [];
    for (let i = 0; i < array.length - 2; i++) {
      let sumOfThree = array[i] + array[i + 1] + array[i + 2];
      arrayOfSum.push(sumOfThree)
    }
    return(lagerMeasurements(arrayOfSum));
  }
  console.log("---=== 2 task ===---");
  console.log("Maximum of sum: " + lagerSumMeasurements(arrayOfNumbers));
});
