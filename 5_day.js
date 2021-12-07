fs = require("fs");
fs.readFile("5_input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let arrayOfStrings = data.split(/\n/);

  // Converting array of string to array of numbers
  let linesCoordinates = [];
  // Store coordinates: [X1,Y1,X2,Y2]
  for (let i = 0; i < arrayOfStrings.length; i++) {
    arrayOfStrings[i] = arrayOfStrings[i].split(" -> ");
    for (let j = 0; j < arrayOfStrings[i].length; j++) {
      arrayOfStrings[i][j] = arrayOfStrings[i][j].split(",");
    }
    let coord = [
      Number(arrayOfStrings[i][0][0]),
      Number(arrayOfStrings[i][0][1]),
      Number(arrayOfStrings[i][1][0]),
      Number(arrayOfStrings[i][1][1]),
    ];
    linesCoordinates.push(coord);
  }

  // Function to print map
  function printField(coord) {
    console.log("\nYour map");
    for (let i = 0; i < coord.length; i++) {
      console.log(...coord[i]);
    }
  }

  // First task
  function findVents(coord, lines) {
    let line = Array(1000).fill(0);
    let row = Array(1000).fill(line);
    let field = JSON.parse(JSON.stringify(row));
    let points = 0;
    for (let i = 0; i < coord.length; i++) {
      let current = coord[i];
      if (current[0] == current[2]) {
        let minMax = [current[1], current[3]];
        for (let j = Math.min(...minMax); j <= Math.max(...minMax); j++) {
          field[j][current[0]]++;
        }
      } else if (current[1] == current[3]) {
        let minMax = [current[0], current[2]];
        for (let j = Math.min(...minMax); j <= Math.max(...minMax); j++) {
          field[current[1]][j]++;
        }
      } else if (lines == 3) {
        let x = current[0]
        let y = current[1]
        let step = Math.abs(current[0]-current[2])
        while (step>=0) {
          field[y][x]++
          current[0]<current[2] ? x++ : x--
          current[1]<current[3] ? y++ : y--
          step--
        }
      }
    }
    field.forEach((element) => {
      let filtered = element.filter((el) => el >= 2);
      points = points + filtered.length;
    });
    return points;
  }

  console.log("---=== 1 task ===---");
  console.log("Points: " + findVents(linesCoordinates, 2));

  // Second task
  console.log("---=== 2 task ===---");
  console.log("Points: " + findVents(linesCoordinates, 3));
});
