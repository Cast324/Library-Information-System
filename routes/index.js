var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/landing', function(req, res, next) {
  res.render('landing');
});

router.get('/administration', function(req, res, next) {
  res.render('administration');
});

router.get('/circulation', function(req, res, next) {
  res.render('circulation');
});

router.get('/reference', function(req, res, next) {
  res.render('reference');
});

router.get('/itportal', function(req, res, next) {
  res.render('itportal');
});

module.exports = router;
