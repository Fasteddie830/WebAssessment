//Main body of the web application

const express = require('express');
const app = express();
require('dotenv').config() // loads data from .env file

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.urlencoded({
    extended: true
}))

const path = require('path');
const public = path.join(__dirname, 'public');
app.use(express.static(public));

//Style Templates
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/public/css'));

//View Engine
const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
 
/* app.set('views', __dirname + "views");  */
/*  app.set('view engine', 'hjs'); */ 

const router = require('./routes/restaurantRoutes');
app.use('/', router);

app.listen(5000, () => {
    console.log('Server started on port 5000. Ctrl^c to quit.');
})