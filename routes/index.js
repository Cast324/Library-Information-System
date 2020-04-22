var express = require('express');
var router = express.Router();
// var databasemanager = require('../public/javascripts/databasemanager.js');
var databasemanager = require('../config/database.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});
var accountId;
const passport = require('passport');
const Account = require('../models/Account');
const Books = require('../models/Book_Item');


/* GET home page. */
router.get('/', checkNotAuthenticated, function(req, res, next) {
  res.render('index');
});
//This is my change
router.post('/', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/landing',
  failureRedirect: '/',
  failureFlash: false
}))


function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/landing')
  }

  next()
}
router.get('/landing',checkAuthenticated, function(req, res, next) {
  res.render('landing');
});

router.get('/administration',checkAuthenticated, function(req, res, next) {
  Account.findAll()
        .then(account => {
            res.render('administration', { account })
        })
        .catch(err => console.log(err));
});

router.get('/materials',checkAuthenticated, function(req, res, next) {
  Books.findAll()
        .then(account => {
            res.render('administration', { account })
        })
        .catch(err => console.log(err));
});

router.post('/administration/delete', checkAuthenticated, urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  var sql = 'delete from Account where accountId = '+req.body.removeAccountSNumber+';';
  databasemanager.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Account deleted, ID: " + result.insertId);
  })
  res.redirect('/administration');
});

router.post('/administration', checkAuthenticated,  urlencodedParser, function(req, res) {

  const data = {
    firstName: req.body.firstNameInput,
    lastName: req.body.lastNameInput,
    email: req.body.emailInput,
    address: req.body.addressInput,
    isAdmin: req.body.isAdminRadio,
    password: req.body.passwordInput
  }

    Account.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.address,
      isAdmin: data.isAdmin,
      password: data.password
    })
      .then(account => res.redirect('/administration'))
      .catch(err => console.log(err));
  // if (!req.body) return res.sendStatus(400);
  // console.log(req.body);
  // let current_datetime = new Date();
  // let dbDate = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
  // var sql = 'insert into Account (creationDate, state, password) values (\''+dbDate+'\',\'active\',\''+req.body.passwordInput+'\');';
  // var tempId;
  // dbQuery(sql, function(result) {
  //   tempId = result;
  //   if (req.body.selectAccount === 'patronAccount') {
  //     let patronSql = 'insert into Patron (accountID, firstName, lastName, address, email) values ('+tempId+',\''+req.body.firstNameInput+'\',\''+req.body.lastNameInput+'\',\''+req.body.addressInput+'\',\''+req.body.emailInput+'\');';
  //     databasemanager.query(patronSql, function(err, result) {
  //       if (err) throw err;
  //       console.log("Patron account made, ID:" + result.insertId);
  //     })
  //   } else if (req.body.selectAccount === 'staffAccount') {
  //     let patronSql = 'insert into Staff (accountID, firstName, lastName, email, isAdmin) values ('+tempId+',\''+req.body.firstNameInput+'\',\''+req.body.lastNameInput+'\',\''+req.body.emailInput+'\','+req.body.isAdminRadio+');';
  //     databasemanager.query(patronSql, function(err, result) {
  //       if (err) throw err;
  //       console.log("Patron account made, ID:" + result.insertId);
  //     })
  //   }  
  // });
  // console.log(req.body);
  // res.redirect('/administration');
});

function dbQuery(sql, callback) {
  databasemanager.query(sql, function(err, result) {
    if (err) throw err;
    console.log("account record made, ID: " + result.insertId);
    return callback(result.insertId)
  })
}
router.get('/circulation',checkAuthenticated, function(req, res, next) {
  res.render('circulation');
});

router.get('/reference',checkAuthenticated, function(req, res, next) {
  res.render('reference');
});

router.get('/itportal',checkAuthenticated, function(req, res, next) {
  res.render('itportal');
});

function checkAuthenticated(req, res, next) {

  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/')
}

router.delete('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router;
