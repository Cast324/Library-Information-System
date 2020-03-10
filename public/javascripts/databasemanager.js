const dotenv = require('dotenv')

const mysql = require('mysql')
dotenv.config()

var mysqlConnection = mysql.createConnection({
  host     : process.env.DBHOST,
  user     : process.env.DBUSER,
  password : process.env.DBPASSWORD,
  database : process.env.DBDATABASE
});

mysqlConnection.connect((err) => {
  if (err) throw err;
  console.log("Database Connected")
})


  module.exports = mysqlConnection