var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const passport = require('passport')
const fs = require("fs")
const flash = require('express-flash')
const session = require('express-session')
const dbPath = path.join(__dirname, './bin/admin.json')
const methodOverride = require('method-override')
// const db = require('./public/javascripts/databasemanager');
const db = require('./config/database');
const Account = require('./models/Account.js');
const Item = require('./models/Item');
const Book = require('./models/Book_Item');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const initializePassport = require('./bin/services/passportconfig.js')
initializePassport(
  passport,
  email => findEmail(email),
  id => findByID(id)
)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET || 'Test',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


app.use('/', indexRouter);
app.use('/users', usersRouter);

//Sequelize Associations

//Database Conection
try {
  db.authenticate();
  //Sync all tables in database with models
  //db.sync({ alter : true});
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

const loadUsers = () => {
  try {
    const dataBuffer = fs.readFileSync(dbPath)
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(e) {
    console.log(e)
    return[]
  }
}

async function findUserbyEmail(email) {
  const data = await Account.findAll({
    where: {
      email: email
    }
  })
        .then(account => {
            return account
        })
        .catch(err => console.log(err));

        return data
}

async function findUserbyID(id) {
  const data = await Account.findAll({
    where: {
      accountId: id
    }
  })
        .then(account => {
            return account
        })
        .catch(err => console.log(err));

        return data
}

const findEmail = async (email) => {

  return await findUserbyEmail(email)
  

}

const findByID = async (id) => {
  return await findUserbyID(id)

}

module.exports = app, passport;
