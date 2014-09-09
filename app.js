var express = require('express');
var app = express();
var fs = require('fs');


app.use(express.static(__dirname + '/src/'));

app.listen(3221);
console.log('listen 3221');
