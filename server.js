'use strict';

var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var app = express();

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'standard',
    layoutsDir: path.join(__dirname, "app/views/layouts"),
    partialsDir: [
        path.join(__dirname, "app/views/partials"),
        path.join(__dirname, "pattern/partials")
    ],
    //viewsDir: path.join(__dirname, "pattern")
}));

app.use('/images/', express.static('pattern/images'));
app.use('/thesett-laf/styles/images/', express.static('pattern/images'));
app.use('/thesett-laf/', express.static('app'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'pattern'));

app.get('/', function(req, res) {
    res.render('typography');
});
app.get('/typography', function(req, res) {
    res.render('typography');
});
app.get('/buttons', function(req, res) {
    res.render('buttons');
});
app.get('/cards', function(req, res) {
    res.render('cards');
});
app.get('/tables', function(req, res) {
    res.render('tables');
});
app.get('/forms', function(req, res) {
    res.render('forms');
});
app.get('/dialogs', function(req, res) {
    res.render('dialogs');
});

app.listen(9072, function() {
    console.log('express-handlebars example server listening on: 9072');
});
