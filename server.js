'use strict';

var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var app = express();

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'standard',
    layoutsDir: path.join(__dirname, "app/views/layouts"),
    partialsDir: path.join(__dirname, "app/views/partials"),
    viewsDir: path.join(__dirname, "pattern")
}));

app.use('/thesett-laf/', express.static('app'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'pattern'));

app.get('/', function (req, res) {
    res.render('pattern.hbs');
});

app.listen(9072, function () {
    console.log('express-handlebars example server listening on: 9072');
});
