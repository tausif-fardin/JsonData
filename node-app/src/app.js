const express = require('express');
const app = express();
const path = require('path');
const usersRoute = require('./routes/userRoutes');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

app.use('/users', usersRoute);

module.exports = app;
