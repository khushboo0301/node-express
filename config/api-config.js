var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var AuthenticRoute = require('../app/routes/authentic.route');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();
app.use('/', router);
AuthenticRoute.init(router);

// index route
app.get('/', (req, res) => {
   res.send('Hello World');
 });
 
var ApiConfig = {
   app: app
}

module.exports = ApiConfig;
