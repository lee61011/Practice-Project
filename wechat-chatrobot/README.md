#	微信公众号聊天机器人



## 使用 ngrok 将本机作为服务器



## 开启公众号开发模式的步骤





## 实现 URL 配置验证,开启开发模式



## 接受微信服务器转发过来的用户消息



## 使用 xml2js 解析 xml 格式数据

```
/**
 * Created by lee61011 on 2018/4/16.
 */

//  1. 引入 express 包
const express = require("express");
//  引入 xml2js 包
const xml2js = require("xml2js");
//  创建 xml--->js 对象
const  parser = new xml2js.Parser({explicitArray: false});
//  创建 js--->xml 对象
const  builder = new xml2js.Builder({rootName: "xml", cdata: true, headless: true});

//  2. 创建 express 实例
const app = express();

//  3. 设置路由
app.get("/",function (req,res) {
    console.log("有人来请求了");
    //  express 中获取 get 请求的参数
    //  console.log(req.query.echostr);

    res.send(req.query.echostr);
});

//  添加 post 的路由,处理微信服务器转发过来的用户消息
app.post("/",function (req,res) {
    //  console.log("用户发送消息了!");
    //  1. 获取 post 请求中的内容
    var bufferList = [];
    req.on("data",function (chunk) {
        bufferList.push(chunk);
    })
    req.on("end",function () {
        var result = Buffer.concat(bufferList);

        //  将获取到的微信服务器发来的消息数据, 使用 xml2js 转化成 js 对象
        parser.parseString(result.toString(),function (err,result) {

            //  声明一个 msg 变量
            let msg = "";

            //  如果是文本消息 则处理
            if ( result.xml.MsgType == "text" ) {
                switch ( result.xml.Content ) {
                    case "1":
                        msg = "您发送了1";
                        break;
                    case "2":
                        msg = "您发送了2";
                        break;
                    case "3":
                        msg = "您发送了3";
                        break;
                    default:
                        msg = "消息未识别";
                }
            }

            //  将最终要回复给用户的消息,响应给微信服务器
            //  这个消息是以 xml 格式的数据进行发送的

            //  响应给微信服务器的数据中也包含如下几个参数: ToUserName  FromUserName ... ...

            //  创建一个回复消息的对象
            var returnMsg = {
                ToUserName: result.xml.FromUserName,
                FromUserName: result.xml.ToUserName,
                CreateTime: +new Date(),
                MsgType: "text",
                Content: msg,
            }
            //  将回复消息对象转换成 xml 格式的数据, 响应给微信服务器
            res.send( builder.buildObject( returnMsg ) );

        })
    })
})

//  4. 开启监听
app.listen(9999,function(){
    console.log("服务器已经启动: http://lee61011.free.ngrok.cc/")
});
```



## 图灵机器人接口说明及使用



## 将图灵机器人添加到聊天机器人中



## 总结

