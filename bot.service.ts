exports.imageGenerator = (allPics) => {
    console.log(allPics.length);
    return allPics[Math.floor(Math.random() * allPics.length)];
}
/**
 * Randomly generates a number
 */
exports.diceGenerator = (num) => {
    let newNum = 0;
    const numArr = num.split(" ");
    numArr.map(num => {
        if (Number.isInteger(Number(num))) {
            newNum += Number(num);
        }
    })
    const selectedNumber = Math.floor(Math.random() * newNum);
    return "```# " + (selectedNumber + 1) + "\n" + "Details: d" + num + " (" + (selectedNumber + 1) + ")" + "```";
}

exports.arraysEqual = (a,b) => {
    if (a.length === b.length) {
        return a.filter((val, i) => val === b[i]).length === a.length;
    }
}