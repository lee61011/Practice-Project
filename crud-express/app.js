const express = require('express')
const router = require('./router')
const app = express();


//  开放静态资源目录
app.use('/public/', express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))


//  配置 art-template 模板
app.engine('html', require('express-art-template'))
//  使用 art-template 模板
//  把路由容器挂在到 app 服务中
app.use(router)

app.listen(3000, function () {
    console.log('running 3000 ...')
})