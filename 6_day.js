fs = require("fs");
fs.readFile("6_input.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let arrayOfStrings = data.split(",");
  // Converting array of string to array of numbers
  let fishes = [];
  // Converting array of string to array of numbers
  for (let i = 0; i < arrayOfStrings.length; i++) {
    fishes.push(Number(arrayOfStrings[i]));
  }
  let days = 80

  function oneDay(fishes) {
    let newFishes = []
    let isNewFish = []
    fishes.forEach(fish => {
      if (fish == 0) {
        isNewFish.push(8)
        newFishes.push(6)
      } else {
        newFishes.push(fish-1)
      }
    });
    if (isNewFish.length > 0) {
      newFishes = [...newFishes, ...isNewFish]
    }
    return newFishes
  }
  function result(fishes) {
    let after = [...fishes]
    let count = 0
    while (count < days) {
      after = oneDay(after)
      count++
    }
    return after.length
  }

  

  console.log("---=== 1 task ===---");
  console.log("After 80 days: " + result(fishes));

  // Second task
  console.log("---=== 2 task ===---");
});
