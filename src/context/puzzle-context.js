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
            sum2 = sum2 + 3 + step[0]
          }
          if (step[1] === 1 && step[0] === 1) sum2 = sum2 + 3
          if (step[1] === 1 && step[0] === 2) sum2 = sum2 + 1
          if (step[1] === 1 && step[0] === 3) sum2 = sum2 + 2
          if (step[1] === 3 && step[0] === 1) sum2 = sum2 + 6 + 2
          if (step[1] === 3 && step[0] === 2) sum2 = sum2 + 6 + 3
          if (step[1] === 3 && step[0] === 3) sum2 = sum2 + 6 + 1
        });
        day2[0] = sum1;
        day2[1] = sum2;
      }
      return day2

    default:
      break;
  }
}

export { puzzleFunc };
