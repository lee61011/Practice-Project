const express = require('express')
const fs = require('fs')

const app = express();


//  开放静态资源目录
app.use('/public/', express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))


//  配置 art-template 模板
app.engine('html', require('express-art-template'))
//  使用 art-template 模板
app.get('/', function (req, res) {
    //  readFile 的第二个参数是可选的，传入 utf-8 就是告诉它把我们读取到的文件直接按照 utf-8 编码转换成我们能够认识的字符
    //  除了这样来转换之外，也可以通过 data.toString() 的方式
    fs.readFile('./db.json', 'utf-8', function (err, data) {
        if (err) {
            return res.status(500).send('Server error.')
        }

        //  从文件中读取到的数据
        var students = JSON.parse(data).students
        res.render('index.html', {
            fruits: ['香蕉', '橘子', '苹果'],
            students: students
        })

    })
})

app.listen(3000, function () {
    console.log('running 3000 ...')
})