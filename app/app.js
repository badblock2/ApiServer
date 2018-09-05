const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/stockitems', require('./api/stockitem'));
app.use('/marketindices', require('./api/marketindex'));

module.exports = app;