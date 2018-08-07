//Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

//Middleware for data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Empty Array to store friend objects

//HTML Routes
require('./app/routing/htmlRoutes')(app);
require('./app/routing/apiRoutes')(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });