/**
 * Created by 76506 on 2017/07/25.
 */
exports.reply = function *(next) {
  var message = this.weixin;
  if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      if (message.EventKey) {
        console.log('扫二维码进来的');
      }
      this.body = '感谢订阅';
    }
    else if (message.Event === 'unsubscribe') {
      console.log('取消订阅');
      this.body = '';
    }
    else if (message.Event === 'LOCATION') {
      this.body = '地理位置纬度' + message.Latitude + '地理位置经度' + message.Longitude + '地理位置精度' + message.Longitude
    }
    else if (message.Event === 'CLICK') {
      this.body = '你点击了菜单' + message.EventKey
    }
    else if (message.Event === 'SCAN') {
       console.log('扫二维码进来的'+ message.EventKey);
       this.body = '看到你了哦';
    }
    else if (message.Event === 'VIEW') {
       this.body = '你点击了菜单中的链接' + message.EventKey;
    }  
  }
  else if (message.MsgType === 'text') {
    var content = message.Content;
    var reply = '你说的' + message.Content + '太复杂了';

    if (content === '1') {
      reply = '1'
    } else if(content === '2'){
      reply = '2'
    } else if(content === '3'){
      reply = '3'
    } else if(content === '4'){
      reply = [{
        title: 'title1',
        description: 'description1',
        picUrl: 'http://101.200.44.252:9090/static/1493472812482.jpeg',
        url: 'http://up1994.com:8888/technicalNotes'
      },{
        title: 'title2',
        description: 'description2',
        picUrl: 'http://101.200.44.252:9090/static/1495532389276.png',
        url: 'http://up1994.com:8888/technicalNotes'
      }]
    }

    this.body = reply;
  }

  yield next;
}
