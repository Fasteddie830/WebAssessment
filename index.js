const express = require('express');
const app = express();

require('dotenv').config();
const path = require('path');
const public = path.join(__dirname,'public');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.static(public));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const router = require('./routes/guestbookRoutes');
app.use('/', router); 
app.use(express.urlencoded({extended: false }));

app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})