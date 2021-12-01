const { log } = require('console');
const { connected, on } = require('process');
const { cursorTo } = require('readline');
fs = require('fs');
fs.readFile('18_input', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    let array = data.split("\n");
    array.pop()
    // console.log(array);
    
    function strToNum(str) {
        let arr = []      
        for (let i = 0; i < str.length; i++) {
            if (Number(str[i])) {
                arr.push(Number(str[i]))
            } else {
                arr.push(str[i]) 
            }
           
        }
        let sum = ...arr
        console.log(sum);
    }
    strToNum(`(8 * 8 * 7) + 5`)

    // let arrayOfSum = array.map((num) => {})
    
    // let sum = arrayOfSum.reduce(
    //     (num1, num2) => {
    //         // console.log(num1, num2);
    //         return num1 + num2
    // }, 0)
    // console.log(sum);
});

// 87328019009