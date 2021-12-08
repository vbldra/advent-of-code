fs = require("fs");
fs.readFile("6_input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let arrayOfStrings = data.split(",");
  let fishes = arrayOfStrings.sort().map(Number);
  // Creating array to store amount of fishes sorted by days from 0 to 8
  let counting = Array(9).fill(0);
  fishes.forEach((fish) => {
    counting[fish]++;
  });
  console.log(counting);
  let days = 80;

  function oneDay(counting) {
    let newCounting = Array(9).fill(0);
    counting.forEach((count, index) => {
      if (index == 0 ) {
        newCounting[6] += count;
        newCounting[8] += count;
      } else if (index > 0) {
        newCounting[index - 1] += count;
      }
    });
    return newCounting
  }
  function result(counting) {
    let initial = 1;
    while (initial <= days) {
      counting = oneDay(counting);
      initial++;
    }
    let sum = counting.reduce((acc, a) => acc + Number(a), 0);
    return sum;
  }

  console.log("---=== 1 task ===---");
  console.log("After 80 days: " + result(counting));

  // Second task
  console.log("---=== 2 task ===---");
  days = 256
  console.log("After 256 days: " + result(counting));
});
