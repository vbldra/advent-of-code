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
        newArr.map((step) => {
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
        array.map((str) => {
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
        arrayOfNumbers.map((group) => {
          let first = Math.sign(group[0] - group[2]);
          let second = Math.sign(group[1] - group[3]);
          if (first !== second || (first === 0 && second === 0)) {
            sum1 = sum1 + 1;
          }
        });
        //second task
        arrayOfNumbers.map((group) => {
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
          indexes.map((letter, index) => {
            stack[i][letter] !== " " && newStack[index].push(stack[i][letter]);
          });
        }
        let newNewStack = JSON.parse(JSON.stringify(newStack))
        
        for (let i = 0; i < moves.length; i++) {
          let result = moves[i].match(/\d+/g);
          let num = result.map((e) => Number(e))
          let stringToMove = newStack[num[1]-1].splice(-num[0]).reverse()
          let newLine = newStack[num[2]-1].concat(...stringToMove)
          newStack[num[2]-1] = newLine
        }
        let res = newStack.map(el=>el.slice(-1))
        
        //second task
        for (let i = 0; i < moves.length; i++) {
          let result = moves[i].match(/\d+/g);
          let num = result.map((e) => Number(e))
          let stringToMove = newNewStack[num[1]-1].splice(-num[0])
          let newLine = newNewStack[num[2]-1].concat(...stringToMove)
          newNewStack[num[2]-1] = newLine
        }
        let res2 = newNewStack.map(el=>el.slice(-1))

        day5[0] = res.join("");
        day5[1] = res2.join("");
      }
      return day5;

    default:
      break;
  }
}

export { puzzleFunc };