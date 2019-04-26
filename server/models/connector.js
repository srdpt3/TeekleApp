const pool = require('./dbconnection');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

var resultsNotFound = {
  "errorCode": "0",
  "errorMessage": "Operation not successful.",
  "rowCount": "0",
  "data": ""
};
var resultsFound = {
  "errorCode": "1",
  "errorMessage": "Operation successful.",
  "rowCount": "1",
  "data": ""
};

module.exports = {
  createUser: function (req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

      bcrypt.hash(req.body.inputPassword, saltRounds, function (err, hash) {
        var sql = 'INSERT INTO users SET ?';
        var values = { 'name': req.body.inputEmail, 'email': req.body.inputEmail, 'password': hash, 'createdAt': new Date(), 'updatedAt': new Date() }
        // Use the connection
        connection.query(sql, values, function (error, results, fields) {
          if (error) {
            resultsNotFound["errorMessage"] = "emailID already exists.";
            return res.send(resultsNotFound);
          } else return res.send(resultsFound);

          // When done with the connection, release it.
          connection.release(); // Handle error after the release.
          if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        });
      });
    });
  },
  loginUser: function (req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

      var sql = 'SELECT * FROM `users` WHERE `email` = ?';
      var values = [req.body.inputEmail]
      // Use the connection
      connection.query(sql, values, function (error, results, fields) {
        if (error) {
          resultsNotFound["errorMessage"] = "Something went wrong with Server.";
          return res.send(resultsNotFound);
        }
        if (results == "") {
          resultsNotFound["errorMessage"] = "User Id not found.";
          return res.send(resultsNotFound);
        }
        bcrypt.compare(req.body.inputPassword, results[0].password, function (err, result) {
          if (result == true) {
            var token = {
              "token": jwt.sign(
                { email: req.body.inputEmail },
                process.env.JWT_SECRET,
                { expiresIn: '30d' }
              )
            }
            resultsFound["data"] = token;
            res.send(resultsFound);
          } else {
            resultsNotFound["errorMessage"] = "Incorrect Password.";
            return res.send(resultsNotFound);
          }
        });

        // When done with the connection, release it.
        connection.release(); // Handle error after the release.
        if (error) throw error; // Don't use the connection here, it has been returned to the pool.
      });
    });
  },

  getbitCoinData: function (response) {

    var request = require('request');
    request('https://api.coindesk.com/v1/bpi/currentprice.json', function (err, res, body) {
      
   
      var data = JSON.parse(body);
      resultsFound["data"] = data;
      console.log(resultsFound);

      response.send(resultsFound);
      

    });


    // pool.getConnection(function (err, connection) {
    //   if (err) throw err; // not connected!

    //     var sql = 'SELECT * FROM `user` WHERE `email` = ?';
    //     var values = [input]
    //     // Use the connection
    //     connection.query(sql, values, function (error, results, fields) {
    //       if (error) {
    //         resultsNotFound["errorMessage"] = "Something went wrong with Server.";
    //         return res.send(resultsNotFound);
    //       }
    //       if (results =="") {
    //         resultsNotFound["errorMessage"] = "User Id not found.";
    //         return res.send(resultsNotFound);
    //       }
    //       resultsFound["data"] = results[0];
    //       res.send(resultsFound);
    //       // When done with the connection, release it.
    //       connection.release(); // Handle error after the release.
    //       if (error) throw error; // Don't use the connection here, it has been returned to the pool.
    //     });
    //   });
  },
  updateUser: function (userEmail, req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

      bcrypt.hash(req.body.inputPassword, saltRounds, function (err, hash) {
        var sql = 'UPDATE user SET ? WHERE `email` = ?';
        var values = { 'name': req.body.name, 'email': req.body.inputEmail, 'password': hash, 'question': req.body.question, 'answer': req.body.answer, 'updatedAt': new Date() }
        // Use the connection
        connection.query(sql, [values, userEmail], function (error, results, fields) {
          if (error) {
            console.log(error)
            resultsNotFound["errorMessage"] = "Data is NOT updated.";
            return res.send(resultsNotFound);
          } else return res.send(resultsFound);

          // When done with the connection, release it.
          connection.release(); // Handle error after the release.
          if (error) throw error; // Don't use the connection here, it has been returned to the pool.
        });
      });
    });
  },

};