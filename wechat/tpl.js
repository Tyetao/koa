/**
 * Created by 76506 on 2017/07/25.
 */
var ejs = require('ejs');
var heredoc = require('heredoc');

var tpl = heredoc(function () {/*
 <xml>
 <ToUserName><![CDATA[<% ToUserName %>]]></ToUserName>
 <FromUserName><![CDATA[<% FromUserName %>]]></FromUserName>
 <CreateTime><% CreateTime %></CreateTime>
 <MsgType><![CDATA[<% MsgType %>]]></MsgType>
 <% if (MsgType === 'text') { %>
    <Content><![CDATA[<% Content %>]]></Content>
 <% } else if (MsgType === 'image') { %>
    <Image>
        <MediaId><![CDATA[<% Content.media_id %>]]></MediaId>
    </Image>
 <% } else if (MsgType === 'voice') { %>
    <Voice>
        <MediaId><![CDATA[<% Content.media_id %>]]></MediaId>
    </Voice>
 <% } else if (MsgType === 'voice') { %>
     <Voice>
        <MediaId><![CDATA[<% Content.media_id %>]]></MediaId>
        <Title><![CDATA[<% Content.title %>]]></Title>
        <Description><![CDATA[<% Content.description %>]]></Description>
     </Voice>
 <% } else if (MsgType === 'music') { %>
     <Music>
         <Title><![CDATA[<% Content.title %>]]></Title>
         <Description><![CDATA[<% Content.description %>]]></Description>
         <MusicUrl><![CDATA[<% Content.MUSIC_Url %>]]></MusicUrl>
         <HQMusicUrl><![CDATA[<% Content.HQ_MUSIC_Url %>]]></HQMusicUrl>
         <ThumbMediaId><![CDATA[<% Content.thumbMediaId %>]]></ThumbMediaId>
     </Music>
 <% } %>
 </xml>
*/})

var compiled = ejs.compile(tpl);

exports = module.exports = {
    compiled: compiled
}