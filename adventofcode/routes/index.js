var express = require('express');
var router = express.Router();

const { createDaysRoute } = require('../src/utils/pathHelper')
const { getImage } = require('../src/utils/getImage')
const { controllers } = require('./days_list');

/* GET home page. */
router.get('/', function(req, res, next) {
  const days = []
  for(const d of Object.keys(controllers)) {
    days.push({dayNumber: d, path: createDaysRoute(d), img: getImage(d)})
  }
  res.render('index', 
    { 
      title: 'Advent of Code 2022', 
      days: days
    }
  );
});

module.exports = router;
