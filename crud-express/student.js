/* 
    数据操作文件模块
        职责：操作文件中的数据，只处理数据，不关心业务
*/

const fs = require('fs')
const dbPath = './db.json'

/* 
    获取所有学生类表
    return []
*/
exports.find = function (callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if (err) {
            return callback(err)
        }

        callback(null, JSON.parse(data).students)
    })
}

/* 
    根据 id 获取学生信息对象
*/
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if (err) {
            return callback(err)
        }

        var students = JSON.parse(data).students
        var ret = students.find(function (item) {
            return item.id === parseInt(id)
        })
        callback(null, ret)
    })
}

/*
    添加保存学生
*/
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if (err) {
            return callback(err)
        }

        //  先把文件中读取到的数据转换成字符串，再将学生信息 push 进去，最后再通过 fs.write 将数据写入文件
        var students = JSON.parse(data).students
        //  处理 id (判断如果列表为空的时候 id 为 1)
        /* if ( students.length === 0 ) {
            student.id = 1
        } else {
            student.id = students[students.length - 1].id + 1
        } */
        student.id = students.length === 0 ? 1 : students[students.length - 1].id + 1
        

        students.push(student)
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if(err){
                return callback(err)
            }

            callback(null)
        })
    })
}

/*
    更新学生
*/
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if (err) {
            return callback(err)
        }

        var students = JSON.parse(data).students
        student.id = parseInt(student.id)
        //  find 方法 满足条件 终止遍历
        var stu = students.find(function(item){
            return item.id === student.id
        })
        //  为 student 重新赋值
        for (var key in student) {
            stu[key] = student[key]
        }

        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err)
            }

            callback(null)
        })
    })
}

/*
    删除学生
*/
exports.deleteById = function (id, callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if (err) {
            return callback(err)
        }

        //  先把文件中读取到的数据转换成字符串，再将学生信息 push 进去，最后再通过 fs.write 将数据写入文件
        var students = JSON.parse(data).students

        //  findIndex 
        var deleteId = students.findIndex(function (item) {
            return item.id === parseInt(id)            
        })
        
        //  删除对应的学生对象
        students.splice(deleteId, 1)

        //  重写数据
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err)
            }

            callback(null)
        })
    })
}