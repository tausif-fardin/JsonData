const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const router = require('Router');

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    res.render("index");
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
})