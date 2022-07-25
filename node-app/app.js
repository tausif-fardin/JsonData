const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);

app.use(bodyParser.urlencoded({ extended: true }));
const usersRoute = require('./server/routes/route.js')
app.use(express.urlencoded());
app.get('/', function (req, res) {
    res.render("index");
});

app.use('/users', usersRoute);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
})