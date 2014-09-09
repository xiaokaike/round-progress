var express = require('express');
var app = express();
var fs = require('fs');


app.use(express.static(__dirname + '/src/'));

app.listen(7777);
console.log('listen 7777');
