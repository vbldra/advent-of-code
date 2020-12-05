const { connected } = require('process');
fs = require('fs');
fs.readFile('3_input', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    
    let arrayStrings = data.split(`\n`);
    let array = [];
    for (let i = 0; i < arrayStrings.length; i++) {
        const line = arrayStrings[i].repeat(100);
        array.push([...line]);
    }

    // FIRST
    let currentPosition = array[0][0];
    function howManyTreesHere(right, down) {
        let how = 0;
        let first = 0;
        for (let i = 0; i < array.length; i+=down) {
            currentPosition = array[i][first];
            if (currentPosition === "#") {
                how ++;
            }
            first += right;
        };
        return how;
    }
    
    // SECOND
    let howManyTrees1 = howManyTreesHere(1, 1);
    console.log(howManyTrees1);
    let howManyTrees2 = howManyTreesHere(3, 1);
    console.log(howManyTrees2);
    let howManyTrees3 = howManyTreesHere(5, 1);
    console.log(howManyTrees3);
    let howManyTrees4 = howManyTreesHere(7, 1);
    console.log(howManyTrees4);
    let howManyTrees5 = howManyTreesHere(1, 2);
    console.log(howManyTrees5);

    console.log(howManyTrees1 * howManyTrees2 * howManyTrees3 * howManyTrees4 * howManyTrees5);

});
  

