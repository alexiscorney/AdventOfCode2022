

//const file = readFileSync('../input/day1.txt');

const day1 = ((req, res) => {
    //console.log(file);
    res.json(`DAY - ${req.params.day}`);
})


module.exports = { day1 }