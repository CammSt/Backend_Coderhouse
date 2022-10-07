const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const { engine } = require('express-handlebars');
const productos = require('./routes/products')

app.use('/', productos)
app.use(cookieParser());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'hbs');

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

module.exports = app