var express = require('express');
var router = express.Router();
// var databasemanager = require('../public/javascripts/databasemanager.js');
var databasemanager = require('../config/database.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});
var accountId;
const passport = require('passport');
const Account = require('../models/Account');
const Item = require('../models/Item');


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
router.get('/landing',checkAuthenticated, async function(req, res, next) {
  const admin = {
    admin: false
  }
  const user = await req.user
  if(user[0].dataValues.isAdmin == 1) {
    admin.admin = true
  }
  res.render('landing', admin);
});

router.get('/administration',checkAuthenticated, function(req, res, next) {
    const accounts = Account.findAll();
    const item = Item.findAll();
    
    Promise
      .all([accounts, item,])
      .then(responses => {res.render('administration', {account: responses[0], book: responses[1]}), console.log(responses[1]);})
      .catch(err => console.log(err));

});

router.get('/account/:id',checkAuthenticated, function(req, res, render) {
  const accountId = req.params.id;
  console.log('Did something');
  Account.findAll({
    where: {
      accountId: accountId
    }
  })
  .then(account => {
      res.send( account )
  })
  .catch(err => console.log(err));
});

router.put('/account/:id', checkAuthenticated, function(req, res) {
  const accountId = req.params.id;
  const data = {
    firstName: req.body.firstNameUpdate,
    lastName: req.body.lastNameUpdate,
    email: req.body.emailUpdate,
    address: req.body.addressUpdate,
    isAdmin: req.body.isAdminRadio,
    password: req.body.passwordUpdate
  }
  Account.update({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    address: data.address,
    isAdmin: data.isAdmin,
    password: data.password
  },{
    where: {
      accountId: accountId
    }
  })
  .then(() => {
    console.log('Update successful');
    res.redirect('/administration');
  })
  .catch(err => console.log(err));

});

router.delete('/account/delete/:id', checkAuthenticated, (req, res) => {
  const accountId = req.params.id;
  Account.destroy({
    where: {
      accountId: accountId
    }
  })
  .then(() => {
    console.log('Delete Successful');
    res.redirect('/administration');
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
router.get('/circulation',checkAuthenticated, async function(req, res, next) {
  const admin = {
    admin: false
  }
  const user = await req.user
  if(user[0].dataValues.isAdmin == 1) {
    admin.admin = true
  }
  res.render('circulation', admin);
});

router.get('/reference',checkAuthenticated, async function(req, res, next) {
  const admin = {
    admin: false
  }
  const user = await req.user
  if(user[0].dataValues.isAdmin == 1) {
    admin.admin = true
  }
  res.render('reference',admin);
  
});
router.get('/circulation/:accountId/:itemId', checkAuthenticated, (req, res) => {
  const accountId = req.params.accountId;
  const itemId = req.params.itemId;
  console.log(accountId);
  console.log(itemId);

  const accounts = Account.findAll({
    where : {
      accountId: accountId
    }
  });
  const item = Item.findAll({
    where: {
      barcode: itemId
    }
  });
    
    Promise
      .all([accounts, item,])
      .then(responses => {
        var foundArray = [];
        for (i = 0; i < responses.length; i++) {
          if (responses[i].length > 0 ) {
            foundArray[i] = true;
          }
          else {
            foundArray[i] = false;
          }
        }
        console.log(responses[0]);
        res.send(foundArray);
      })
      .catch(err => console.log(err));

});

router.post('/circulation/:accountId/:itemId', checkAuthenticated, (req, res) => {
  const accountId = req.params.accountId;
  const itemId = req.params.itemId;

  console.log(accountId, itemId);
});
  res.redirect('/circulation');

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
