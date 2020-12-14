const { log } = require('console');
const { connected, on } = require('process');
const { cursorTo } = require('readline');
fs = require('fs');
fs.readFile('14_input', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    let array = data.split("\n");
    array.pop()
    let mask = "";
    let mem = {};
    for (let i = 0; i < array.length; i++) {
        if (array[i].includes("mask")) {
            mask = array[i].substr(7);
        } else {
            let smallArr = array[i].split(" = ");
            let tag = smallArr[0].substring(4, smallArr[0].length-1);
            let value = Number(smallArr[1]).toString(2)
            if (mask.length !== value.length) {
                let X = mask.length - value.length;
                while (X > 0) {
                    value = "0" + value;
                    X --;
                }
            }
            value = [...value];
            mask = [...mask];
            for (let j = mask.length-1; j >= 0 ; j--) {
                if (mask[j] === "0") {
                    value[j] = "0";
                } else if (mask[j] === "1") {
                    value[j] = "1";
                }
            }
            mem[tag] = value;
        }
    }
    let sum = 0
    for (const key in mem) {
        mem[key] = parseInt(mem[key].join(""), 2);
        sum += mem[key];
    }
    console.log(sum);
});