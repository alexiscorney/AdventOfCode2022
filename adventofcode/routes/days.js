var express = require('express');
const req = require('express/lib/request.js');
var router = express.Router();
const { controllers } = require('./days_list');


/* GET days listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:day', function(req, res, next) {
  const json = controllers[req.params.day]();
  res.render('day', json);
});

module.exports = router;
