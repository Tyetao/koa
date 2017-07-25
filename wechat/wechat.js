var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var util = require('./util');
var prefix = 'https://api.weixin.qq.com/cgi-bin/';
var api = {
    accessToken: prefix + 'token?grant_type=client_credential'
}

//票据类
function Wechat(opts) {
    var that = this;
    this.appID = opts.appID;
    this.appsecret = opts.appsecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;

    this.getAccessToken()
        .then(function (data) {
            try {
                data = JSON.parse(data);
                console.log('access_token',data)
            } catch(e) {
                return that.updateAccessToken(data);
            }

            if (that.isValidAccessToken(data)) {
                return Promise.resolve(data);
            } else {
                return that.updateAccessToken();
            }
        })
        .then(function (data) {
            that.access_token = data.access_token;
            that.expires_in = data.expires_in;

            that.saveAccessToken(data);
        })
}
//检查票据合法性
Wechat.prototype.isValidAccessToken = function (data) {
    console.log('isValidAccessToken' + JSON.stringify(data));
    if ( !data || !data.access_token || !data.expires_in) {
        return false;
    }

    var access_token = data.access_token;
    var expires_in = data.expires_in;
    var now = (new Date().getTime());

    if ( now < expires_in) {
        return true;
    } else {
        return false;
    }
}

//更新票据
Wechat.prototype.updateAccessToken = function () {
    console.log('updateAccessToken');
    var appID = this.appID;
    var appsecret = this.appsecret;
    var url = api.accessToken + '&appid=' + appID + '&secret=' + appsecret;
    console.log('获取票据接口' + url);
    return new Promise(function (resolve, reject) {
        request({url: url, json: true}).then(function (res) {
            var data = res.body;
            var now = (new Date().getTime());
            var expires_in = now + (data.expires_in - 20)*1000;

            data.expires_in = expires_in;
            resolve(data);
        })
    })
}


Wechat.prototype.reply = function () {
    var content = this.body;
    var message = this.weixin;
    var xml = util.tpl(content, message);

    this.status = 200;
    this.type = 'application/xml';
    this.body = xml;
}

module.exports =  Wechat;