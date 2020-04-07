var express = require('express');
var router = express.Router();
var databasemanager = require('../public/javascripts/databasemanager.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});
var accountId;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/landing', function(req, res, next) {
  res.render('landing');
});

router.get('/administration', function(req, res, next) {
  databasemanager.query("SELECT * FROM Patron", (err, rows, fields) => {
    if (err) throw err;
    const patrons = {
      patron: rows
    }
    res.render('administration', patrons)
  })
});

router.post('/administration', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  let current_datetime = new Date();
  let dbDate = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
  var sql = 'insert into Account (creationDate, state, password) values (\''+dbDate+'\',\'active\',\''+req.body.passwordInput+'\');';
  var tempId;
  dbQuery(sql, function(result) {
    tempId = result;
    if (req.body.selectAccount === 'patronAccount') {
      let patronSql = 'insert into Patron (accountID, firstName, lastName, address, email) values ('+tempId+',\''+req.body.firstNameInput+'\',\''+req.body.lastNameInput+'\',\''+req.body.addressInput+'\',\''+req.body.emailInput+'\');';
      databasemanager.query(patronSql, function(err, result) {
        if (err) throw err;
        console.log("Patron account made, ID:" + result.insertId);
      })
    } else if (req.body.selectAccount === 'staffAccount') {
      let patronSql = 'insert into Staff (accountID, firstName, lastName, email, isAdmin) values ('+tempId+',\''+req.body.firstNameInput+'\',\''+req.body.lastNameInput+'\',\''+req.body.emailInput+'\','+req.body.isAdminRadio+');';
      databasemanager.query(patronSql, function(err, result) {
        if (err) throw err;
        console.log("Patron account made, ID:" + result.insertId);
      })
    }  
  });
  console.log(req.body);
  res.redirect('/administration');
});

function dbQuery(sql, callback) {
  databasemanager.query(sql, function(err, result) {
    if (err) throw err;
    console.log("account record made, ID: " + result.insertId);
    return callback(result.insertId)
  })
}
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
