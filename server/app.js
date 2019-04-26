const valFunctions = require('./validator/validate')
const express = require('express');
const app = express();

var requestify = require('requestify');


require('dotenv').config();
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', (req,res) => {
//     res.send("Teekle dd!");

// });


app.post('/signup', function (req, res) {
    if(valFunctions.checkInputDataNULL(req,res)) return false;
    if(valFunctions.checkInputDataQuality(req,res)) return false;
    //if(valFunctions.checkJWTToken(req,res)) return false;
    //if(valFunctions.checkUserAuthRole(req,res)) return false;

    var dbFunctions = require('./models/connector');
    dbFunctions.createUser(req,res);
});

app.listen(process.env.PORT, () => 
    console.log("Server is ready listening  " + process.env.PORT)
);

app.post('/login', function (req, res) {
    if(valFunctions.checkInputDataNULL(req,res)) return false;
    if(valFunctions.checkInputDataQuality(req,res)) return false;
    //if(valFunctions.checkJWTToken(req,res)) return false;
    //if(valFunctions.checkUserAuthRole(req,res)) return false;

    var dbFunctions = require('./models/connector');
    dbFunctions.loginUser(req,res);
});


app.get('/dashboard', function (req, res) {
    //if(valFunctions.checkInputDataNULL(req,res)) return false;
    //if(valFunctions.checkInputDataQuality(req,res)) return false;
    //if(valFunctions.checkUserAuthRole(req,res)) return false;
    var dbFunctions = require('./models/connector');
   // var userEmail = valFunctions.checkJWTToken(req,res);
    //if(!userEmail) return false;
    dbFunctions.getbitCoinData(res);
});