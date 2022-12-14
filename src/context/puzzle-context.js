let puzzles = {};
for (let i = 1; i <= 24; i++) {
  puzzles[i] = false;
}
puzzles[1] = true;
puzzles[2] = true;
puzzles[3] = true;
puzzles[4] = true;
puzzles[5] = true;
puzzles[6] = true;
// puzzles[7] = true;
puzzles[8] = true;
puzzles[9] = true;
puzzles[10] = true;

function puzzleFunc(array, day) {
  switch (day) {
    case 1:
      // First task
      let day1 = [null, null];
      {
        let arrayOfNumbers = [];
        // Converting array of string to array of numbers
        for (let i = 0; i < array.length; i++) {
          arrayOfNumbers.push(Number(array[i]));
        }
        let arrayOfSum = [];
        let sum = 0;
        for (let i = 0; i < arrayOfNumbers.length; i++) {
          if (arrayOfNumbers[i] > 0) {
            sum = sum + arrayOfNumbers[i];
          } else {
            arrayOfSum.push(sum);
            sum = 0;
          }
        }
        day1[0] = Math.max(...arrayOfSum);

        // Second task
        arrayOfSum.sort(function(a, b) {
          return b - a;
        });
        let firstThree = arrayOfSum.splice(0, 3);
        day1[1] = firstThree.reduce((acc, a) => acc + a);
      }
      return day1;

    case 2:
      let day2 = [null, null];
      {
        let sum1 = 0;
        let sum2 = 0;
        let newArr = array.map((el) => {
          el = el.replaceAll(/A|X/g, 1);
          el = el.replaceAll(/B|Y/g, 2);
          el = el.replaceAll(/C|Z/g, 3);
          return el.split(" ").map((e) => Number(e));
        });
        newArr.forEach((step) => {
          // 1 task
          sum1 = sum1 + step[1];
          if (step[0] === step[1]) sum1 = sum1 + 3;
          else if (
            (step[0] === 1 && step[1] === 2) ||
            (step[0] === 2 && step[1] === 3) ||
            (step[0] === 3 && step[1] === 1)
          ) {
            sum1 = sum1 + 6;
          }
          // 2 task
          if (step[1] === 2) {
            sum2 = sum2 + 3 + step[0];
          }
          if (step[1] === 1 && step[0] === 1) sum2 = sum2 + 3;
          if (step[1] === 1 && step[0] === 2) sum2 = sum2 + 1;
          if (step[1] === 1 && step[0] === 3) sum2 = sum2 + 2;
          if (step[1] === 3 && step[0] === 1) sum2 = sum2 + 6 + 2;
          if (step[1] === 3 && step[0] === 2) sum2 = sum2 + 6 + 3;
          if (step[1] === 3 && step[0] === 3) sum2 = sum2 + 6 + 1;
        });
        day2[0] = sum1;
        day2[1] = sum2;
      }
      return day2;

    case 3:
      let day3 = [null, null];
      {
        let sum1 = 0;
        let sum2 = 0;
        let alphabetLow = "abcdefghijklmnopqrstuvwxyz";
        let alphabetStr = alphabetLow + alphabetLow.toUpperCase();
        array.forEach((str) => {
          let first = str.slice(0, str.length / 2);
          let second = str.slice(str.length / 2);
          for (let i = 0; i < first.length; i++) {
            if (second.includes(first[i])) {
              sum1 = sum1 + alphabetStr.indexOf(first[i]) + 1;
              break;
            }
          }
        });
        const chunkSize = 3;
        for (let i = 0; i < array.length; i += chunkSize) {
          const chunk = array.slice(i, i + chunkSize);
          for (let j = 0; j < chunk[0].length; j++) {
            if (
              chunk[1].includes(chunk[0][j]) &&
              chunk[2].includes(chunk[0][j])
            ) {
              sum2 = sum2 + alphabetStr.indexOf(chunk[0][j]) + 1;
              break;
            }
          }
        }
        day3[0] = sum1;
        day3[1] = sum2;
      }
      return day3;

    case 4:
      let day4 = [null, null];
      {
        let sum1 = 0;
        let sum2 = 0;
        // first task
        let arrayOfNumbers = array.map((group) => {
          let newGroup = group.split(",").map((el) => {
            return el.split("-").map((str) => Number(str));
          });
          return newGroup[0].concat(newGroup[1]);
        });
        arrayOfNumbers.forEach((group) => {
          let first = Math.sign(group[0] - group[2]);
          let second = Math.sign(group[1] - group[3]);
          if (first !== second || (first === 0 && second === 0)) {
            sum1 = sum1 + 1;
          }
        });
        //second task
        arrayOfNumbers.forEach((group) => {
          for (let i = group[0]; i <= group[1]; i++) {
            if (i >= group[2] && i <= group[3]) {
              sum2 = sum2 + 1;
              break;
            }
          }
        });
        day4[0] = sum1;
        day4[1] = sum2;
      }
      return day4;

    case 5:
      let day5 = [null, null];
      {
        // first task
        let moves = array.join("\n").split(/\r?\n/);
        let stack = moves.splice(0, moves.indexOf(""));
        moves.shift();
        let newStack = [];
        let indexes = [];
        for (let i = 0; i < stack[stack.length - 1].length; i++) {
          if (stack[stack.length - 1][i] !== " ") {
            newStack.push([Number(stack[stack.length - 1][i])]);
            indexes.push(Number(i));
          }
        }
        for (let i = stack.length - 2; i >= 0; i--) {
          indexes.forEach((letter, index) => {
            stack[i][letter] !== " " && newStack[index].push(stack[i][letter]);
          });
        }
        let newNewStack = JSON.parse(JSON.stringify(newStack));

        for (let i = 0; i < moves.length; i++) {
          let result = moves[i].match(/\d+/g);
          let num = result.map((e) => Number(e));
          let stringToMove = newStack[num[1] - 1].splice(-num[0]).reverse();
          let newLine = newStack[num[2] - 1].concat(...stringToMove);
          newStack[num[2] - 1] = newLine;
        }
        let res = newStack.map((el) => el.slice(-1));

        //second task
        for (let i = 0; i < moves.length; i++) {
          let result = moves[i].match(/\d+/g);
          let num = result.map((e) => Number(e));
          let stringToMove = newNewStack[num[1] - 1].splice(-num[0]);
          let newLine = newNewStack[num[2] - 1].concat(...stringToMove);
          newNewStack[num[2] - 1] = newLine;
        }
        let res2 = newNewStack.map((el) => el.slice(-1));

        day5[0] = res.join("");
        day5[1] = res2.join("");
      }
      return day5;

    case 6:
      let day6 = [null, null];
      {
        function findIndexOfMarker(data, size) {
          let entry = data[0];
          let markersIndex;
          for (let i = size - 1; i < entry.length; i++) {
            let uniqueSet = [...new Set(entry.slice(i - size + 1, i + 1))];
            if (uniqueSet.length === size) {
              markersIndex = i + 1;
              break;
            }
          }
          return markersIndex;
        }
        day6[0] = findIndexOfMarker(array, 4);
        day6[1] = findIndexOfMarker(array, 14);
      }
      return day6;

    case 7: // NOT WORKING
      let day7 = [null, null];
      {
        let sum = {};
        let structure = { "/": {} };
        let index = 0;
        let currentPath = ["/"];
        while (index < array.length) {
          if (array[index].includes("$ cd")) {
            if (array[index].includes("$ cd /")) {
              currentPath = ["/"];
            } else if (array[index].includes("$ cd ..")) {
              currentPath.pop();
            } else {
              let currentFolder = array[index].replace("$ cd", "").trim();
              currentPath.push(currentFolder);
            }
            index++;
          } else if (array[index].includes("$ ls")) {
            index++;
            while (array[index] && array[index].includes("$") === false) {
              let structurePath = structure;
              currentPath.forEach((key) => {
                structurePath = structurePath[key];
              });
              if (array[index].includes("dir")) {
                let folder = array[index].replace("dir", "").trim();
                structurePath[folder] = {};
              } else {
                let values = array[index].split(" ");
                structurePath[String(values[1])] = Number(values[0]);
                sum[currentPath] = sum[currentPath]
                  ? sum[currentPath] + Number(values[0])
                  : Number(values[0]);
              }
              index++;
            }
          }
        }

        function findSum(sum) {
          let newSumObj = JSON.parse(JSON.stringify(sum));
          let newKeys = Object.keys(newSumObj);
          // console.log(newSumObj);

          // for (let i = newKeys.length - 1; i > 0; i--) {
          //   for (let j = newKeys.length - 2; j > 0; j--) {
          //     if (newKeys[i].includes(newKeys[j])) {
          //       newSumObj[j] = newSumObj[j] + newSumObj[i];
          //     }
          //   }
          // }

          for (let i = newKeys.length - 1; i >= 0; i--) {
            let sum = newSumObj[newKeys[i]];
            let key = newKeys[i].split(",");
            // console.log("----")
            // console.log(newKeys[i])
            if (key.length > 1) {
              key.pop();
              key = key.join(",");
              newSumObj[key] += sum;
            } else {
              newSumObj[newKeys[i]] += sum;
            }
            key = newKeys[i].split(",");

            // console.log(key)
          }

          const asArray = Object.values(newSumObj);
          const filtered = asArray.filter((value) => value < 100000);
          const totalSum = filtered.reduce(
            (partialSum, a) => partialSum + a,
            0
          );
          return totalSum;
        }
        // console.log(findSum(sum));
        // day7[0] = findIndexOfMarker(array, 4);
        // day7[1] = findIndexOfMarker(array, 14);
      }
      return day7;

    case 8:
      let day8 = [null, null];
      {
        let arrayOfNum = [];
        for (let i = 0; i < array.length; i++) {
          arrayOfNum.push(array[i].split("").map((e) => Number(e)));
        }
        // creating a reversed copy of array for easy measurements
        let arrayOfNumReversed = Array(arrayOfNum[0].length).fill(
          Array(arrayOfNum.length).fill(null)
        );
        arrayOfNumReversed = JSON.parse(JSON.stringify(arrayOfNumReversed));
        for (let i = 0; i < arrayOfNum.length; i++) {
          for (let j = 0; j < arrayOfNum[i].length; j++) {
            arrayOfNumReversed[j][i] = arrayOfNum[i][j];
          }
        }
        // sum of visible trees for 1 task (default all trees on the perimeter)
        let sumOfVisible =
          arrayOfNum[0].length * 2 + (arrayOfNum.length - 2) * 2;
        // default highest scenic score
        let highestScenicScore = 1;
        for (let i = 1; i < arrayOfNum.length - 1; i++) {
          for (let j = 1; j < arrayOfNum[i].length - 1; j++) {
            let current = arrayOfNum[i][j];
            let top = arrayOfNumReversed[j].slice(0, i).reverse();
            let right = arrayOfNum[i].slice(j + 1);
            let bottom = arrayOfNumReversed[j].slice(i + 1);
            let left = arrayOfNum[i].slice(0, j).reverse();
            // 1 task
            let max = [
              Math.max(...top),
              Math.max(...right),
              Math.max(...bottom),
              Math.max(...left),
            ];
            if (Math.min(...max) < current) {
              sumOfVisible++;
            }
            // 2 task
            let currentScoreArr = [0, 0, 0, 0];
            let around = [top, right, bottom, left];
            around.forEach((direction, index) => {
              for (let k = 0; k < direction.length; k++) {
                currentScoreArr[index]++;
                if (direction[k] >= current) break;
              }
            });
            let currentScore = currentScoreArr.reduce((a, b) => a * b);
            highestScenicScore =
              currentScore > highestScenicScore
                ? currentScore
                : highestScenicScore;
          }
        }
        day8[0] = sumOfVisible;
        day8[1] = highestScenicScore;
      }
      return day8;

    case 9:
      let day9 = [null, null];
      {
        let steps = [];
        let maxSum = { U: 1, R: 1, D: 1, L: 1 };
        for (let i = 0; i < array.length; i++) {
          steps.push(
            array[i].split(" ").map((e, ind) => (ind === 1 ? Number(e) : e))
          );
        }
        steps.forEach((step) => {
          maxSum[step[0]] = maxSum[step[0]] + step[1];
        });
        let size = [maxSum["U"] + maxSum["D"], maxSum["L"] + maxSum["R"]];
        let row = Array(size[1] + 1).fill(0);
        let field = Array(size[0] + 1).fill(row);
        field = JSON.parse(JSON.stringify(field));
        let fieldAfter = JSON.parse(JSON.stringify(field));
        let snailHead = [maxSum["U"], maxSum["L"]];
        let snailTail = [maxSum["U"], maxSum["L"]];

        function moveSnail(dir) {
          let where = {
            U: [0, -1, snailHead[0] - snailTail[0], 0, 1],
            D: [0, 1, snailHead[0] - snailTail[0], 0, -1],
            L: [1, -1, snailHead[1] - snailTail[1], 1, -1],
            R: [1, 1, snailHead[1] - snailTail[1], 1, 1],
          };
          let initialHead = JSON.parse(JSON.stringify(snailHead));

          field[snailHead[0]][snailHead[1]] = 0;
          field[snailTail[0]][snailTail[1]] = 0;

          snailHead[where[dir][0]] = snailHead[where[dir][0]] + where[dir][1];

          if (where[dir][2] === 2) {
            snailTail[where[dir][3]] = snailTail[where[dir][3]] + where[dir][4];
          }
          if (
            Math.abs(snailHead[0] - snailTail[0]) > 1 ||
            Math.abs(snailHead[1] - snailTail[1]) > 1
          ) {
            snailTail[0] = initialHead[0];
            snailTail[1] = initialHead[1];
          }
          field[snailHead[0]][snailHead[1]] = "H";
          field[snailTail[0]][snailTail[1]] = "T";
          fieldAfter[snailTail[0]][snailTail[1]] = "*";
        }

        for (let i = 0; i < steps.length; i++) {
          field[snailHead[0]][snailHead[1]] = "H";
          field[snailTail[0]][snailTail[1]] = "T";
          for (let j = 1; j <= steps[i][1]; j++) {
            moveSnail(steps[i][0]);
          }
        }
        let sum = 0;
        fieldAfter.forEach((e) => {
          e.forEach((m) => m === "*" && sum++);
        });
        day9[0] = sum;
        // day9[1] = highestScenicScore;
      }
      return day9;

    case 10:
      let day10 = [null, null];
      {
        // 1 task
        let cpuX = 1;
        let cycles = 0;
        let signals = 0;
        // 2 task
        let sprite = Array(40).fill();
        sprite = sprite.map((e, i) => (i >= 0 && i <= 2 ? "#" : "."));
        let spriteCoord = [0, 2];
        let line = Array(40).fill("-");
        let CRT = Array(6).fill(line);
        CRT = JSON.parse(JSON.stringify(CRT));
        let lineIndex = 0;
        let index = 0;
        for (let i = 0; i < array.length; i++) {
          let current = array[i].split(" ").map((e, i) => (i === 1 ? +e : e));
          for (let j = 1; j <= 2; j++) {
            cycles++;
            if (sprite[index] === "#") {
              CRT[lineIndex][index] = "#";
              index++;
            } else {
              CRT[lineIndex][index] = ".";
              index++;
            }
            if (cycles % 40 === 20) {
              signals = signals + cycles * cpuX;
            }
            if (cycles % 40 === 0) {
              lineIndex++;
              index = 0;
            }
            if (current[0] === "noop") break;
          }
          if (current[0] === "addx") {
            cpuX = cpuX + current[1];
            let spriteInd = spriteCoord[0];
            spriteCoord = [spriteInd + current[1], spriteInd + current[1] + 2];
            sprite = sprite.map((e, i) =>
              i >= spriteCoord[0] && i <= spriteCoord[1] ? "#" : "."
            );
          }
        }
        day10[0] = signals;
        day10[1] = CRT;
      }
      return day10;

    default:
      break;
  }
}
// testing
// let entry = `addx 15
// addx -11
// addx 6
// addx -3
// addx 5
// addx -1
// addx -8
// addx 13
// addx 4
// noop
// addx -1
// addx 5
// addx -1
// addx 5
// addx -1
// addx 5
// addx -1
// addx 5
// addx -1
// addx -35
// addx 1
// addx 24
// addx -19
// addx 1
// addx 16
// addx -11
// noop
// noop
// addx 21
// addx -15
// noop
// noop
// addx -3
// addx 9
// addx 1
// addx -3
// addx 8
// addx 1
// addx 5
// noop
// noop
// noop
// noop
// noop
// addx -36
// noop
// addx 1
// addx 7
// noop
// noop
// noop
// addx 2
// addx 6
// noop
// noop
// noop
// noop
// noop
// addx 1
// noop
// noop
// addx 7
// addx 1
// noop
// addx -13
// addx 13
// addx 7
// noop
// addx 1
// addx -33
// noop
// noop
// noop
// addx 2
// noop
// noop
// noop
// addx 8
// noop
// addx -1
// addx 2
// addx 1
// noop
// addx 17
// addx -9
// addx 1
// addx 1
// addx -3
// addx 11
// noop
// noop
// addx 1
// noop
// addx 1
// noop
// noop
// addx -13
// addx -19
// addx 1
// addx 3
// addx 26
// addx -30
// addx 12
// addx -1
// addx 3
// addx 1
// noop
// noop
// noop
// addx -9
// addx 18
// addx 1
// addx 2
// noop
// noop
// addx 9
// noop
// noop
// noop
// addx -1
// addx 2
// addx -37
// addx 1
// addx 3
// noop
// addx 15
// addx -21
// addx 22
// addx -6
// addx 1
// noop
// addx 2
// addx 1
// noop
// addx -10
// noop
// noop
// addx 20
// addx 1
// addx 2
// addx 2
// addx -6
// addx -11
// noop
// noop
// noop`;

// let data = entry.split(`\n`);
// puzzleFunc(data, 10);

export { puzzleFunc, puzzles };
