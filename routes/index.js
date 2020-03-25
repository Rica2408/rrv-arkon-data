const express = require('express'); 
const app = express();

app.use(require('./task'));

module.exports = app;