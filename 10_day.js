fs = require("fs");
fs.readFile("10_input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let arrayOfStrings = data.split("\n");

  let incompleteLines = [];
  
  // First task
  function findWrongSymbols(data) {
    let illegalSymbols = [];
    for (let i = 0; i < data.length; i++) {
      let illegalLines = false
      let currentLine = [];
      for (let j = 0; j < data[i].length; j++) {
        if (
          data[i][j] == "[" ||
          data[i][j] == "(" ||
          data[i][j] == "{" ||
          data[i][j] == "<"
        ) {
          currentLine.push(data[i][j]);
        } else {
          if (
            (data[i][j] == "]" && currentLine[currentLine.length - 1] == "[") ||
            (data[i][j] == ")" && currentLine[currentLine.length - 1] == "(") ||
            (data[i][j] == "}" && currentLine[currentLine.length - 1] == "{") ||
            (data[i][j] == ">" && currentLine[currentLine.length - 1] == "<")
          ) {
            currentLine.splice(-1);
          } else {
            illegalSymbols.push(data[i][j]);
            illegalLines = true
            break;
          }
        }
      }
      !illegalLines && incompleteLines.push(currentLine)
      // incompleteLines.push(currentLine);
    }
    let sum = 0;
    illegalSymbols.map((e) => {
      e == ")"
        ? (sum = sum + 3)
        : e == "]"
        ? (sum = sum + 57)
        : e == "}"
        ? (sum = sum + 1197)
        : (sum = sum + 25137);
    });
    return sum;
  }

  console.log("---=== 1 task ===---");
  console.log("Sum of points: " + findWrongSymbols(arrayOfStrings));

  // Second task
  
  function completeLines(incompleteLines) {
    let sum = [];
    for (let i = 0; i < incompleteLines.length; i++) {
      let count = 0;
      for (let j = incompleteLines[i].length - 1; j >= 0; j--) {
        count = count * 5;
        incompleteLines[i][j] == "("
          ? (count = count + 1)
          : incompleteLines[i][j] == "["
          ? (count = count + 2)
          : incompleteLines[i][j] == "{"
          ? (count = count + 3)
          : (count = count + 4);
      }
      sum.push(count)
    }
    sum.sort((a,b)=>a-b)
    return sum[Math.round((sum.length-1) /2)]
  }
  console.log("---=== 2 task ===---");
  ;
  console.log("Middle score: " + completeLines(incompleteLines));
});
