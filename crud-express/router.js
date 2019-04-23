const fs = require('fs')
const express = require('express')

//  1. 创建一个路由容器
const router = express.Router()

//  2. 把路由都挂载到 router 路由容器中
router.get('/students', function(req, res){
    fs.readFile('./db.json', 'utf-8', function (err, data) {
        if (err) {
            return res.status(500).send('Server error...')
        }

        //  从文件中读取数据
        var students = JSON.parse(data).students
        res.render('index.html', {
            fruits: ['香蕉', '橘子', '苹果'],
            students: students
        })
    })
})

router.get('/students/new', function (req, res) {
    res.send('new new new')
})


//  3. 把 router 导出
module.exports = router