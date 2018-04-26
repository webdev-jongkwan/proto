const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./config/config');

let app = express();

mongoose.connect(config.db, function () {
    console.log(config.db + ' connected.');
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.engine('html', require('ejs').renderFile);

app.use('/', require('./server/routes'));

app.listen(3005, function () {
    console.log('3005 on.')
});
