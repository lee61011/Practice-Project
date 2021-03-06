const fs = require('fs')
const express = require('express')
const Student = require('./student')

//  1. 创建一个路由容器
const router = express.Router()

//  2. 把路由都挂载到 router 路由容器中
router.get('/students', function(req, res){
    
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Server error...') 
        }

        res.render('index.html', {
            fruits: ['香蕉', '橘子', '苹果'],
            students: students
        })
    })
})

router.get('/students/new', function (req, res) {
    res.render('new.html')
})

router.post('/students/new', function (req, res) {
    //  1. 获取表单数据
    //  2. 处理 (将数据保存到 db.json 文件中)
    //  3. 发送响应
    Student.save(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error ...')
        }

        res.redirect('/students')
    })
})

router.get('/students/edit', function (req, res) {
    //  在客户端列表页处理链接问题（需要有 id 参数）
    //  获取要编辑学生的 id
    //  渲染编辑页面
    
    /* req.render('edit.html', {
        student: 
    }) */
    Student.findById(parseInt(req.query.id), function (err, student) {
        if (err) {
            return res.status(500).send('Server Error ... ')
        }

        //  console.log(student)
        res.render('edit.html', {
            student: student
        })
    })
})

router.post('/students/edit', function (req, res) {
    //  获取表单数据    req.body
    //  更新数据        Student.updateById()
    //  发送响应        
    Student.updateById(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server Error ... ')
        }

        res.redirect('/students')
    })
})

router.get('/students/delete', function (req, res) {
    //  获取要删除的 id
    //  根据 id 执行删除操作
    //  根据操作结果返回响应数据
    //  console.log(req.query.id)
    Student.deleteById(req.query.id, function (err) {
        if (err) {
            return res.status(500).send('Server Error ... ')
        }

        res.redirect('/students')
    })
})


//  3. 把 router 导出
module.exports = router
