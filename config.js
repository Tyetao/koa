var path = require('path');
var util = require('./libs/util');
var wechat_file = path.join(__dirname, './config/wechat.txt');
var config = {
  wechat: {
    appID: 'wx16af86144a975927',
    appsecret: '389b1a901cbe79da238f5e70babcc26f',
    token: 'tanyetaowecha666666',
    getAccessToken: function () {
      return util.readFileAsync(wechat_file);
    },
    saveAccessToken: function (data) {
      data = JSON.stringify(data);
      return util.writeFileAsync(wechat_file, data);
    }
  }
}
module.exports = config;