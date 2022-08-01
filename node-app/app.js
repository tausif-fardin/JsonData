const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
const app = express();
const mysql = require('mysql');


//Create connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'usermanagement'
});

//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

require('dotenv').config();

//set views file
app.set('views', path.join(__dirname, 'views'));
//set view engine
app.set('view engine', 'ejs');
//app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set public folder as static folder for static file
app.use('/static', express.static('./static/'));

const usersRoute = require('./server/routes/route.js');

app.get('/', function (req, res) {
    res.render('index');
});

app.use('/users', usersRoute);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
    console.log('http://localhost:3000')
})