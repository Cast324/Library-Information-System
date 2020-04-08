var express = require('express');
var router = express.Router();
var databasemanager = require('../public/javascripts/databasemanager.js')
const passport = require('passport')


/* GET home page. */
router.get('/', checkNotAuthenticated, function(req, res, next) {
  res.render('index');
});

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
  databasemanager.query("SELECT * FROM Patron", (err, rows, fields) => {
    if (err) throw err;
    const patrons = {
      patron: rows
    }
    res.render('administration', patrons)
  })
});

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
