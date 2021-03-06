var express = require('express');
var router = express.Router();
// var databasemanager = require('../public/javascripts/databasemanager.js');
var databasemanager = require('../config/database.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var accountId;
const passport = require('passport');
const Account = require('../models/Account');
const Item = require('../models/Item');
const Book_Lending = require('../models/Book_Lending');
const Collection = require('../models/Collection');
const sequelize = require('sequelize')


/* GET home page. */
router.get('/', checkNotAuthenticated, function (req, res, next) {
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
router.get('/landing', checkAuthenticated, async function (req, res, next) {
  const admin = {
    admin: false
  }
  const user = await req.user
  if (user[0].dataValues.isAdmin == 1) {
    admin.admin = true
  }
  res.render('landing', admin);
});

router.get('/administration', checkAuthenticated, function (req, res, next) {
  const accounts = Account.findAll();
  const item = Item.findAll();
  const collection = Collection.findAll();

  Promise
    .all([accounts, item, collection])
    .then(responses => { res.render('administration', { account: responses[0], book: responses[1], collection: responses[2] }); })
    .catch(err => console.log(err));

});

router.get('/account/:id', checkAuthenticated, function (req, res, render) {
  const accountId = req.params.id;
  Account.findAll({
    where: {
      accountId: accountId
    }
  })
    .then(account => {
      res.send(account)
    })
    .catch(err => console.log(err));
});

//Wade's Book/Item Scripts
router.get('/item/:barcode', checkAuthenticated, function (req, res, render) {
  const barcode = req.params.barcode;
  Item.findAll({
    where: {
      barcode: barcode
    }
  })
    .then(item => {
      res.send(item);
    })
    .catch(err => console.log(err));
});

router.post('/book/add', checkAuthenticated, (req, res) => {
  console.log(req.body);
  const data = {
    title: req.body.bookTitleInput,
    author: req.body.bookAuthorInput,
    format: req.body.bookFormat,
    language: req.body.bookLanguage,
    location: req.body.bookLocationInput,
    collectionId: req.body.bookCollection,
    libraryId: req.body.library
  }
  Item.create({
    title: data.title,
    format: data.format,
    language: data.language,
    author: data.author,
    location: data.location,
    libraryId: data.libraryId,
    collectionId: data.collectionId,
  })
    .then(() => {
      console.log('Update successful');
      res.redirect('/administration');
    })
    .catch(err => console.log(err));
});
router.put('/item/:barcode', checkAuthenticated, function (req, res) {
  console.log(req.body);
  const barcode = req.params.barcode;
  const data = {
    title: req.body.bookTitleUpdateInput,
    author: req.body.bookAuthorUpdateInput,
    format: req.body.bookFormatUpdate,
    language: req.body.bookLanguageUpdate,
    location: req.body.bookLocationUpdateInput,
    collectionId: req.body.bookCollectionUpdate,
    libraryId: req.body.libraryUpdate
  }
  Item.update({
    title: data.title,
    format: data.format,
    language: data.language,
    author: data.author,
    location: data.location,
    libraryId: data.libraryId,
    collectionId: data.collectionId,
  }, {
    where: {
      barcode: barcode
    }
  })
    .then(() => {
      console.log('Update successful');
      res.redirect('/administration');
    })
    .catch(err => console.log(err));
});

router.delete('/item/delete/:barcode', checkAuthenticated, (req, res) => {
  const barcode = req.params.barcode;
  Item.destroy({
    where: {
      barcode: barcode
    }
  })
    .then(() => {
      console.log('Delete Successful');
      res.redirect('/administration');
    })
    .catch(err => console.log(err));
});

//End Wade's Scripts

router.put('/account/:id', checkAuthenticated, function (req, res) {
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
  }, {
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

router.get('/materials', checkAuthenticated, function (req, res, next) {
  Books.findAll()
    .then(account => {
      res.render('administration', { account })
    })
    .catch(err => console.log(err));
});


router.post('/administration', checkAuthenticated, urlencodedParser, function (req, res) {

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
});

router.get('/circulation',checkAuthenticated, async function(req, res, next) {
  const admin = {
    admin: false
  }
  const user = await req.user
  if (user[0].dataValues.isAdmin == 1) {
    admin.admin = true
  }
  res.render('circulation', admin);
});

router.get('/reference', checkAuthenticated, async function (req, res, next) {

  console.log(req.query)

  var admin = {
    admin: false
  }
  const user = await req.user
  if (user[0].dataValues.isAdmin == 1) {
    admin.admin = true
  }

  Item.findAll({
    where: {
      title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + req.query.search + '%')
    }
  }).then((items) => {
    admin = {
      admin: admin,
      items: items
    }
    res.render('reference', admin)
}
    )

});
router.post('/circulation/:itemId', checkAuthenticated, (req, res) => {
  const itemId = req.params.itemId;
  var data = {};
  Item.findAll({
    where: {
      barcode: itemId
    }
  })
  .then((item)=> {
    console.log(item);
    if (item[0] == undefined) {
      data = {
        'exists': false,
        'chekedOut': false
      }
      res.send(data);
    } else{
      if(item[0].dataValues.checkedOut == 0){
        data = {
          'exists': true,
          'checkedOut': false
        }
        res.send(data)
      }else{
          data = {
            'exists': true,
            'checkedOut': true
          }
          checkIn(itemId);
          res.send(data);
        }
    }
  })
  .catch((err) =>{
    console.log(err);
    res.send(false);
  });
});

function checkIn(itemId) {
  Item.update({
    checkedOut: 0
  },{
    where: {
      barcode: itemId
    }
  })
  .then(() => {
    console.log('check in successful');
  })
  .catch((err) =>{
    console.log(err);
  });
}

router.get('/circulation/:accountId/:itemId', checkAuthenticated, (req, res) => {
  const accountId = req.params.accountId;
  const itemId = req.params.itemId;

  const accounts = Account.findAll({
    where: {
      accountId: accountId
    }
  });
  const item = Item.findAll({
    where: {
      barcode: itemId,
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
        if (responses[1] != undefined) {
          if (responses[1][0].dataValues.checkedOut == 1){
            foundArray[i] = true;
          } else {
            foundArray[i] = false
          }
        }
        res.send(foundArray);
      })
      .catch(err => console.log(err));

});

router.post('/circulation/:accountId/:itemId', checkAuthenticated, (req, res) => {
  const accountId = req.params.accountId;
  const itemId = req.params.itemId;
  let current_datetime = new Date();
  let dueDate = new Date();
  dueDate.setDate((current_datetime.getDate() +21));
  let dbDate = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
  let dueDbDate = dueDate.getFullYear() + "-" + (dueDate.getMonth() + 1) + "-" + current_datetime.getDate();

  console.log(dbDate, dueDbDate);
  const book_lending = Book_Lending.create({
    accountId: accountId,
    creationDate: dbDate,
    dueDate: dueDbDate,
    barcode: itemId
  });
  const item = Item.update({
    checkedOut: 1
  },{
    where: {
      barcode: itemId
    }
  });

  Promise
      .all([book_lending, item])
      .then(() => {
        console.log('Checkout Successful');
        res.redirect('/circulation');
      })
      .catch(err => console.log(err));

});
  

router.get('/reference',checkAuthenticated, function(req, res, next) {
  res.render('reference');
});

router.get('/itportal', checkAuthenticated, function (req, res, next) {
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
