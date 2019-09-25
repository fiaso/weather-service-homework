var express = require('express');
var routes = require('./routes.js');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(routes);

app.listen(8088, function () {
  console.log('Example app listening on port 8088!');
});
