var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world11');
  
});

// var port = process.env.PORT || 5000;
// app.listen(port);

app.listen(3000);
console.log('Version: ' + process.version);