const { connected } = require('process');
fs = require('fs');
fs.readFile('5_input', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    let array = data.split("\n");
    
    // First

    let seatRow = [];
    let seatColumn = [];
    for (let i = 0; i < 128; i++) {
        seatRow.push(i); // creating array with row
        if (i < 8) {
            seatColumn.push(i); // creating array with column
        }
    }

    function upper(array) {
        return array.slice((array.length/2), array.length);
    }
    function lower(array) {
        return array.slice(0, (array.length/2));
    }

    let idSeat = [];
    for (let i = 0; i < array.length; i++) {
        let arrayCurrentRow = [...seatRow];
        let arrayCurrentColumn = [...seatColumn];
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] === "F") {
                arrayCurrentRow = lower(arrayCurrentRow);
            } else if (array[i][j] === "B") {
                arrayCurrentRow = upper(arrayCurrentRow);
            } else if (array[i][j] === "R") {
                arrayCurrentColumn = upper(arrayCurrentColumn);
            } else if (array[i][j] === "L") {
                arrayCurrentColumn = lower(arrayCurrentColumn);
            }
        }
        idSeat.push(Number(arrayCurrentRow) * 8 + Number(arrayCurrentColumn));
    }
    const ID_MAX = Math.max(...idSeat);
    console.log(ID_MAX);
    
    // Second

    let notInList = [];
    for (let i = 1; i <= ID_MAX; i++) {
        if (!idSeat.includes(i)) {
            notInList.push(i);  
        }
    }
    console.log(notInList);
});
  

