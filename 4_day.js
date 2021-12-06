const { log } = require("console");
const { connected } = require("process");
const { stringify } = require("querystring");
fs = require("fs");
fs.readFile("4_input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let arrayOfStrings = data.split(/\n/);

  // Converting first array of string to array of numbers
  let arrayOfNumbers = arrayOfStrings[0].split(",").map(Number);

  // Creating array with bingo cards
  let bingoCards = [];
  let bingoCard = [];
  let winner = 0;
  for (let i = 2; i < arrayOfStrings.length; i++) {
    if (arrayOfStrings[i] !== "") {
      let line = arrayOfStrings[i].split(" ");
      line = line.filter((e) => e !== "").map(Number);
      bingoCard = [...bingoCard, ...line];
      continue;
    }
    bingoCards.push(bingoCard);
    bingoCard = [];
  }
  // console.log(bingoCards);
  // let bingoCardsCopy = JSON.parse(JSON.stringify(bingoCards));

  function printCard(card) {
    let i = 0;
    let n = card.length;
    console.log("\n B  I  N  G  O\n==============");
    while (i < n) {
      let line = card.slice(i, (i += 5));
      let newline = line.map((e) => {
        if (e < 10) {
          return " " + e;
        }
        return String(e);
      });
      console.log(...newline);
    }
  }

  function markOneCard(card, number) {
    let isNumberHere = card.find((x) => x === number);
    if (isNumberHere) {
      let index = card.indexOf(number);
      card[index] = " X";
      let rem = index % 5;
      let col = card.filter((e, i) => i % 5 == rem && e == " X");
      // console.log(col);
      let minNow = Math.floor(index / 5) * 5;
      let row = card.filter(
        (e, i) => i >= minNow && i < minNow + 5 && e == " X"
      );
      if (row.length === 5 || col.length === 5) {
        // printCard(card);
        return ["W", card, number];
      }
    }
    return card;
  }

  // First task
  function findWinner(numbers, cards) {
    let currentGameCards = cards;
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < currentGameCards.length; j++) {
        currentGameCards[j] = markOneCard(currentGameCards[j], numbers[i]);
        if (currentGameCards[j][0] == "W") {
          winner = currentGameCards[j];
          break;
        }
      }
      if (winner) {
        break;
      }
    }
    let unmarked = winner[1].filter((e) => e != " X");
    let sum = unmarked.reduce((acc, a) => acc + a, 0);
    printCard(winner[1]);
    return winner[2] * sum;
  }
  console.log("---=== 1 task ===---");
  console.log("Winner: " + findWinner(arrayOfNumbers, bingoCards));

  // Second task
  function findLastWinner(numbers, cards) {
    let currentGameCards = cards;
    let winningCards = [];
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < currentGameCards.length; j++) {
        currentGameCards[j] = markOneCard(currentGameCards[j], numbers[i]);
        if (currentGameCards[j][0] == "W") {
          winner = currentGameCards[j];
          currentGameCards[j][0] = "M";
          winningCards.push(currentGameCards[j]);
        }
      }
    }
    let lastWinner = winningCards.pop();
    printCard(lastWinner[1]);
    let unmarked = lastWinner[1].filter((e) => e != " X");
    let sum = unmarked.reduce((acc, a) => acc + a, 0);
    return lastWinner[2] * sum;
  }
  console.log("---=== 2 task ===---");
  console.log("Last winner: " + findLastWinner(arrayOfNumbers, bingoCards));
});
