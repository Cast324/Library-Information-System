const dotenv = require('dotenv')

const mysql = require('mysql')
dotenv.config()

var connection = mysql.createConnection({
    host     : process.env.DBHOST,
    user     : process.env.DBUSER,
    password : process.env.DBPASSWORD,
    database : process.env.DBDATABASE
  })
   
  connection.connect()
   
  connection.query('SHOW TABLES', function (error, results, fields) {
    if (error) throw error
    console.log('The solution is: ', results)
  })

  connection.end()