fs = require("fs");
fs.readFile("8_input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let arrayOfStrings = data.split("\n");
  let dataArray = [];
  // Converting array of string to array of numbers
  for (let i = 0; i < arrayOfStrings.length; i++) {
    let arr = arrayOfStrings[i].split(" | ");
    let convArr = [arr[0].split(" "), arr[1].split(" ")];
    dataArray.push(convArr);
  }
  function findEasy(array) {
    let easyNum = 0;
    array.forEach((el) => {
      let easyString = el[1].filter(
        (string) =>
          (string.length >= 2 && string.length <= 4) || string.length == 7
      );
      easyNum = easyNum + easyString.length;
    });
    return (easyNum);
  }

  console.log("---=== 1 task ===---");
  console.log("1,4,7,8 appear: " + findEasy(dataArray));

  // Second task
  function printNumber(a) {
    console.log("\nNUMBER");
    console.log(` ${a[0] + a[0] + a[0] + a[0]} `);
    console.log(`${a[1]}    ${a[2]}`);
    console.log(`${a[1]}    ${a[2]}`);
    console.log(` ${a[3] + a[3] + a[3] + a[3]} `);
    console.log(`${a[4]}    ${a[5]}`);
    console.log(`${a[4]}    ${a[5]}`);
    console.log(` ${a[6] + a[6] + a[6] + a[6]} `);
  }

  function decodeAllString(line, answer, numToFind) {
    let numImg = ".......";
    numImg = numImg.split("");
    let numbers = Array(10).fill(null);
    let initial = "abcdefg";
    let amount = [...line[0].join("").split("").sort().join("")];
    // To find letters in 1,4 and 5 positions, sorting all letters
    let count = [
      amount.filter((e) => e == "a").length,
      amount.filter((e) => e == "b").length,
      amount.filter((e) => e == "c").length,
      amount.filter((e) => e == "d").length,
      amount.filter((e) => e == "e").length,
      amount.filter((e) => e == "f").length,
      amount.filter((e) => e == "g").length,
    ];
    numImg[1] = initial[count.indexOf(6)];
    numImg[4] = initial[count.indexOf(4)];
    numImg[5] = initial[count.indexOf(9)];
    answer.map((el, i) => {
      el && el == 1
        ? (numbers[1] = line[1][i])
        : el == 4
        ? (numbers[4] = line[1][i])
        : el == 7
        ? (numbers[7] = line[1][i])
        : el == 8
        ? (numbers[8] = line[1][i])
        : 1;
    });
    numbers.map((el, i) => {
      !el && i == 1
        ? (numbers[1] = line[0].filter((e) => e.length == 2).join(""))
        : i == 4
        ? (numbers[4] = line[0].filter((e) => e.length == 4).join(""))
        : i == 7
        ? (numbers[7] = line[0].filter((e) => e.length == 3).join(""))
        : i == 8
        ? (numbers[8] = line[0].filter((e) => e.length == 7).join(""))
        : 1;
    });

    numImg[2] = numbers[1].split("").filter((e) => e !== numImg[5])[0];
    // Finding letter on 0 position rendering number 7
    for (let i = 0; i < numbers[7].length; i++) {
      if (numImg.indexOf(numbers[7][i]) < 0) {
        numImg[0] = numbers[7][i];
        break;
      }
    }
    // Finding letter on 3 position rendering number 4
    for (let i = 0; i < numbers[4].length; i++) {
      if (numImg.indexOf(numbers[4][i]) < 0) {
        numImg[3] = numbers[4][i];
        break;
      }
    }

    // Finding letter on 7 position rendering number 8
    for (let i = 0; i < numbers[8].length; i++) {
      if (numImg.indexOf(numbers[8][i]) < 0) {
        numImg[6] = numbers[8][i];
        break;
      }
    }

    numToFind.map((el, i) => {
      if (el && el.length == 5) {
        // 2,3,5
        if (el.includes(numImg[2]) && el.includes(numImg[5])) {
          answer[i] = 3;
        } else if (el.includes(numImg[2]) && el.includes(numImg[4])) {
          answer[i] = 2;
        } else {
          answer[i] = 5;
        }
      } else if (el && el.length == 6) {
        // 0,6,9
        if (!el.includes(numImg[3])) {
          answer[i] = 0;
        } else if (!el.includes(numImg[2])) {
          answer[i] = 6;
        } else {
          answer[i] = 9;
        }
      }
    });
    return Number(answer.join(""));
  }

  function decodeString(line) {
    let answer = Array(line[1].length).fill(null);
    let numToFind = Array(4).fill(null);
    line[1].map((el, i) => {
      switch (el.length) {
        case 2:
          answer[i] = 1;
          break;
        case 3:
          answer[i] = 7;
          break;
        case 4:
          answer[i] = 4;
          break;
        case 7:
          answer[i] = 8;
          break;
        default:
          numToFind[i] = el;
          break;
      }
    });
    return decodeAllString(line, answer, numToFind);
  }
  function result(data) {
    let sum = 0
    for (let i = 0; i < data.length; i++) {
      sum = sum + decodeString(data[i])
    }
    return sum
  }
  
  console.log("---=== 2 task ===---");
  console.log("Sum: " + result(dataArray));
});
