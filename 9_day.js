fs = require("fs");
fs.readFile("9_input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let arrayOfStrings = data.split("\n");
  let dataArray = [];
  dataArray.push(Array(arrayOfStrings[0].length + 2).fill("+"));
  // Converting array of string to array of numbers
  for (let i = 0; i < arrayOfStrings.length; i++) {
    let line = arrayOfStrings[i];
    let lineToPush = line.split("").map((e) => Number(e));
    lineToPush.unshift("+");
    lineToPush.push("+");
    dataArray.push(lineToPush);
  }
  dataArray.push(Array(arrayOfStrings[0].length + 2).fill("+"));
  // console.log(dataArray);
  // First task
  function findLowNum(data) {
    let sum = 0;
    for (let i = 1; i < data.length - 1; i++) {
      for (let j = 1; j < data[i].length - 1; j++) {
        let adjLocations = [
          data[i][j - 1],
          data[i - 1][j],
          data[i][j + 1],
          data[i + 1][j],
        ];
        let adjLocationsNum = adjLocations.filter((e) => typeof e == "number");
        if (Math.min(...adjLocationsNum) > data[i][j]) {
          sum = sum + data[i][j] + 1;
        }
      }
    }
    // console.log(data);
    return sum;
  }

  console.log("---=== 1 task ===---");
  console.log("Sum of total risk level: " + findLowNum(dataArray));

  // Second task
  let dataArrayWithout = [];
  for (let i = 0; i < arrayOfStrings.length; i++) {
    let line = arrayOfStrings[i].split("").map((e) => Number(e));
    let newLine = [];
    line.map((e) => {
      if (e != 9) {
        newLine.push(".");
      } else {
        newLine.push(e);
      }
    });
    dataArrayWithout.push(newLine);
  }
  let currentBasins = 0;
  function findField(newField, i, j) {
    newField[i][j] = "+";
    if (i > 0 && newField[i - 1][j] == ".") {
      newField[i - 1][j] = "+";
      currentBasins++;
      findField(newField, i - 1, j);
    }
    if (j < newField[0].length - 1 && newField[i][j + 1] == ".") {
      newField[i][j + 1] = "+";
      currentBasins++;
      findField(newField, i, j + 1);
    }
    if (i < newField.length - 1 && newField[i + 1][j] == ".") {
      newField[i + 1][j] = "+";
      currentBasins++;
      findField(newField, i + 1, j);
    }
    if (j > 0 && newField[i][j - 1] == ".") {
      newField[i][j - 1] = "+";
      currentBasins++;
      findField(newField, i, j - 1);
    }
    return newField;
  }

  function findBasin(data) {
    let basins = [];
    let newField = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < newField.length; i++) {
      for (let j = 0; j < newField[i].length; j++) {
        if (
          newField[i][j] == "." &&
          newField[i][j] != 9 &&
          newField[i][j] != "+"
        ) {
          currentBasins = 1
          newField = findField(newField, i, j);
          basins.push(currentBasins)
        }
      }
    }
    // printField(newField);
    basins.sort((a,b)=>b-a)
    return basins[0]*basins[1]*basins[2]
  }

  function printField(field) {
    console.log("Field");
    for (let i = 0; i < field.length; i++) {
      console.log(...field[i]);
    }
  }

  console.log("---=== 2 task ===---");
  console.log("Multiplications of 3 biggest fields: " + findBasin(dataArrayWithout));
});