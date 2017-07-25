var sha1 = require('sha1');
var getRawBody = require('raw-body');
var Wechat = require('./wechat');
var util = require('./util');

module.exports = function (opts) {
    // var webchat = new Wechat(opts);

    return function *(next){
        // console.log(this.query);
        var that = this;
        var token = opts.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);

        if ( this.method === 'GET' ) {
            if ( sha === signature) {
                this.body = echostr;
            } else {
                this.body = '验证失败';
            }
        }
        else if ( this.method === 'POST') {
            if ( sha !== signature ) {
                this.body = '验证失败';
                return false;
            }
            var data = yield getRawBody(this.req, {
                length: this.length,
                limit: '1mb',
                encoding: this.charset
            })

            var content = yield util.parseXMLAsync(data);
            console.log(content);

            var message = util.formatMessage(content.xml);
            console.log(message);

           /* if (message.MsgType === 'event') {
                if ( message.Event === 'subscribe') {
                    console.log(that.body);
                    var now = new Date().getTime();
                    that.status = 200;
                    that.type = 'application/text';
                    that.body = 'wechat' + now;
                }
            }*/

           // this.weixin = message;

           // yield handler.call(this, next);
           // wechta.reply.call(this);
        }
    }
}