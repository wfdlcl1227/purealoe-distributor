'use strict';  // 严格模式
var express = require('express');  //引入模块 express
var path = require('path'); // 引入路由模块
var port = process.env.PORT || 5000;  //定义端口号
var app = express();
app.use(cors());
app.use('/', express.static(__dirname + '/www'));    
app.listen(port);
console.log('lhapptool started on port ' + port);   //监听端口号
