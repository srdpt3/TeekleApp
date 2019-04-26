var mysql = require('mysql');
const result = require('dotenv').config();
if (result.error) {
  console.log(result.error)
}
console.log(result.parsed)

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USERNAME,
  password        : process.env.DB_PASSWORD,
  database        : process.env.DB_NAME
});
pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    console.log("Connected!");

    pool.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });

  });

module.exports = pool;