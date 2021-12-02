const { connected } = require("process");
fs = require("fs");
fs.readFile("2_input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let arrayOfStrings = data.split(`\n`);
  let arrayOfMoves = []
  arrayOfStrings.forEach(el => {
    arrayOfMoves.push(el.split(` `))
  });
  // First task
  function multXY(array) {
    let xPos = 0
    let yPos = 0
    for (let i = 0; i < array.length; i++) {
      switch (array[i][0]) {
        case "forward":
          xPos = xPos + Number(array[i][1]);
          break;
        case "down":
          yPos = yPos + Number(array[i][1]);
          break;
        case "up":
          yPos = yPos - Number(array[i][1]);
          break
        default:
          break;
      }
    }
    return xPos*yPos
  }
  console.log("---=== 1 task ===---");
  console.log("Multiply: " + multXY(arrayOfMoves));

  // Second task
  function multXYAim(array) {
    let xPos = 0
    let yPos = 0
    let aim = 0
    for (let i = 0; i < array.length; i++) {
      switch (array[i][0]) {
        case "forward":
          xPos = xPos + Number(array[i][1]);
          yPos = yPos + (aim * Number(array[i][1]))
          break;
        case "down":
          aim = aim + Number(array[i][1]);
          break;
        case "up":
          aim = aim - Number(array[i][1]);
          break
        default:
          break;
      }
    }
    return xPos*yPos
  }
  console.log("---=== 2 task ===---");
  console.log("MMultiply with aim: " + multXYAim(arrayOfMoves));
});
