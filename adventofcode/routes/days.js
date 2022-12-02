var express = require('express');
var router = express.Router();

const { day1 } = require('../src/controllers/day1.js')
const { day2 } = require('../src/controllers/day2.js')

/* GET days listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/:day', function(req, res, next) {
//   res.send('It is day:' + req.params.day);
// });

router.get('/day1', day1);
router.get('/day2', day2);

module.exports = router;
