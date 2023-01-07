var express = require('express');
var router = express.Router();

const { createDaysRoute, createPythonDaysRoute } = require('../src/utils/pathHelper')
const { controllers, python_days } = require('./days_list');

/* GET home page. */
router.get('/', function(req, res, next) {
  const days = []
  const python_days = []
  for(const d of Object.keys(controllers)) {
    days.push({dayNumber: d, path: createDaysRoute(d)})
  }
  for(const d of python_days) {
    python_days.push({dayNumber: d, path: createPythonDaysRoute(d)})
  }
  res.render('index', 
    { 
      title: 'Advent of Code 2022', 
      days: days,
      python_days: python_days
    }
  );
});

module.exports = router;
