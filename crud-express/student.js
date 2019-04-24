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
exports.save = function () {

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