var express = require('express');
var router = express.Router();

const { getPythonScript, getInputPath } = require('../src/utils/pathHelper')

const { spawn } = require('child_process');

router.get('/:day', function(req, res, next) {
    const path = getPythonScript(`day${req.params.day}.py`)
    const inputPath = getInputPath(`day${req.params.day}.txt`);
    const pythonProgram = spawn('python3', [path, inputPath]);
    var dataToSend; 
    pythonProgram.stdout.on('data', (data) => {
        dataToSend = data;
    });
    pythonProgram.on('close', (code) => {
        console.log(`close child process with code ${code}`);
        res.render('day', JSON.parse(dataToSend));
    });
    pythonProgram.stderr.on('data', (data) => {
        console.log(`${data}`)
    });
    
});

module.exports = router 