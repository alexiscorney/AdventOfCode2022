var express = require('express');
var router = express.Router();

const { getPythonScript } = require('../src/utils/pathHelper')

const { spawn } = require('child_process');

router.get('/:day', function(req, res, next) {
    const path = getPythonScript(`day${req.params.day}.py`)
    const pythonProgram = spawn('python3', [path]);
    var dataToSend; 
    pythonProgram.stdout.on('data', (data) => {
        dataToSend = data;
    });
    pythonProgram.on('close', (code) => {
        console.log(`close child process with code ${code}`);
        res.render('day', JSON.parse(dataToSend));
    });
    pythonProgram.stderr.on('data', (data) => {
        console.log(`error ${data}`)
    });
    
});

module.exports = router 