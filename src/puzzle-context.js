let arrayOfSum = [];
// First task
function findSum(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > 0) {
      sum = sum + array[i];
    } else {
      arrayOfSum.push(sum);
      sum = 0;
    }
  }
  return Math.max(...arrayOfSum);
}

// Second task
function findSumThreeBest() {
  arrayOfSum.sort(function (a, b) {
    return b - a;
  });
  let firstThree = arrayOfSum.splice(0, 3)
  return firstThree.reduce((acc, a) => acc + a);
}

export { findSum, findSumThreeBest };
