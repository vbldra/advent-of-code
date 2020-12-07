const { connected } = require('process');
fs = require('fs');
fs.readFile('7_input', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    let array = data.split("\n");
    let stringArray = [];
    let bags = {};
    for (let i = 0; i < array.length; i++) {
        stringArray.push(array[i].split(" "))
    }
    for (let i = 0; i < stringArray.length; i++) {
        currentBagBig = stringArray[i][0] + " " + stringArray[i][1];
        bags[currentBagBig] = {};
        for (let j = 7; j < stringArray[i].length; j += 4) { 
            bags[currentBagBig][stringArray[i][j-2] + " " + stringArray[i][j-1]] = Number(stringArray[i][j-3]);
        }
    }
    let countSet = new Set();
    function addToSet(object, string) {
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                for (const key1 in object[key]) {
                    if (key1 === string) {
                        countSet.add(key);
                    }
                }
            }
        }
    }
    addToSet(bags, "shiny gold");
    for (const iterator of countSet) {
        addToSet(bags, iterator);
    }
    console.log(countSet.size)

    // Second
 
    function countBags(object, currentBag) {
        console.log(currentBag, ":", object[currentBag])
        if (object[currentBag]) {
            let countBagsRec = 0;
            for (const key in object[currentBag]) {
                countBagsRec += object[currentBag][key] + object[currentBag][key] * countBags(object, key)
            }
            return countBagsRec
        } else {
            return 0;
        }
    }
    console.log(countBags(bags, "shiny gold"))
});