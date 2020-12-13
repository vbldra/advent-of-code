const { log } = require('console');
const { connected, on } = require('process');
const { cursorTo } = require('readline');
fs = require('fs');
fs.readFile('12_input', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    let array = data.split("\n");
    array.pop()
    
    // First
    let currentPosition = [0, 0, "E"]
  
    for (let i = 0; i < array.length; i++) {
        let direction = array[i][0];
        let num = Number(array[i].slice(1));
        if (direction === "N") {
            currentPosition[1] += num;
        } else if (direction === "E") {
            currentPosition[0] += num;
        } else if (direction === "S") {
            currentPosition[1] -= num;
        } else if (direction === "W") {
            currentPosition[0] -= num;
        } else {
            if (currentPosition[2] === "E") {
                if (direction === "R") {
                    if (num == 90) {
                        currentPosition[2] = "S";
                    } else if (num == 180) {
                        currentPosition[2] = "W";
                    } else {
                        currentPosition[2] = "N";
                    }
                } else if (direction === "L") {
                    if (num == 90) {
                        currentPosition[2] = "N";
                    } else if (num == 180) {
                        currentPosition[2] = "W";
                    } else {
                        currentPosition[2] = "S";
                    }
                } else {
                    currentPosition[0] += num
                }
            } else if (currentPosition[2] === "S") {
                if (direction === "R") {
                    if (num == 90) {
                        currentPosition[2] = "W";
                    } else if (num == 180) {
                        currentPosition[2] = "N";
                    } else {
                        currentPosition[2] = "E";
                    }
                } else if (direction === "L") {
                    if (num == 90) {
                        currentPosition[2] = "E";
                    } else if (num == 180) {
                        currentPosition[2] = "N";
                    } else {
                        currentPosition[2] = "W";
                    }
                } else {
                    currentPosition[1] -= num;
                }
            } else if (currentPosition[2] === "W") {
                if (direction === "R") {
                    if (num == 90) {
                        currentPosition[2] = "N";
                    } else if (num == 180) {
                        currentPosition[2] = "E";
                    } else {
                        currentPosition[2] = "S";
                    }
                } else if (direction === "L") {
                    if (num == 90) {
                        currentPosition[2] = "S";
                    } else if (num == 180) {
                        currentPosition[2] = "E";
                    } else {
                        currentPosition[2] = "N";
                    }
                } else {
                    currentPosition[0] -= num;
                }
            } else {
                if (direction === "R") {
                    if (num == 90) {
                        currentPosition[2] = "E";
                    } else if (num == 180) {
                        currentPosition[2] = "S";
                    } else {
                        currentPosition[2] = "W";
                    }
                } else if (direction === "L") {
                    if (num == 90) {
                        currentPosition[2] = "W";
                    } else if (num == 180) {
                        currentPosition[2] = "S";
                    } else {
                        currentPosition[2] = "E";
                    }
                } else {
                    currentPosition[1] += num;
                }
            }
        }
    }
    console.log(currentPosition)
    console.log(currentPosition[0]+currentPosition[1])
});