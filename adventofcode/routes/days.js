var express = require('express');
var router = express.Router();

const { day1 } = require('../controllers/day1.js')

/* GET days listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/:day', function(req, res, next) {
//   res.send('It is day:' + req.params.day);
// });

router.get('/:day', day1);

module.exports = router;
