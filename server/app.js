const valFunctions = require('./validator/validate')
const express = require('express');
const request = require('request');

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


// app.get('/', function (req, res) {
//     request(
//         {
//           method: "GET",
//           uri: 'https://coinone.co.kr/account/login/?app_id=b8ca9f25-61f6-424e-80d6-55536734c752',
//           //headers: make_header(req_query),
//           //formData: req_query
//           //callback_ur: 'http://localhost:3000/login'
//         },
//         (err, res, result) => {
//           if (err) {
//             console.log(err);
//             return;
//           }
          
//           //let data = JSON.parse(result).data
//           console.log(res);
          
//         }
//       );
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

app.get('/test', function (req, res) {
    //if(valFunctions.checkInputDataNULL(req,res)) return false;
    //if(valFunctions.checkInputDataQuality(req,res)) return false;
    //if(valFunctions.checkUserAuthRole(req,res)) return false;
    var dbFunctions = require('./models/connector');
   // var userEmail = valFunctions.checkJWTToken(req,res);
    //if(!userEmail) return false;
    dbFunctions.getbitCoinData(res);
});