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
    添加保存学生
*/
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if (err) {
            return callback(err)
        }

        //  先把文件中读取到的数据转换成字符串，再将学生信息 push 进去，最后再通过 fs.write 将数据写入文件
        var students = JSON.parse(data).students
        //  处理 id
        student.id = students[students.length - 1].id + 1
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
exports.update = function () {

}


/*
    删除学生
*/
exports.delete = function () {

}