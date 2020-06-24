'use strict';
var express = require('express');
var app = express();
let server = require('http').Server(app);
var port = process.env.PORT || 5000; 

app.use('/', express.static(__dirname + '/www'));    
app.listen(port);
console.log('lhapptool started on port ' + port);   //监听端口号
