var koa = require('koa');
var config = require('./config');
var weixin = require('./weixin');
var wechat = require('./wechat/g');
var app = new koa();

app.use(wechat(config.wechat, weixin.reply));

app.listen(1234);

console.log('localhost:1234');