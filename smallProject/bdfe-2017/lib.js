let fs = require('fs');
let path = require('path');
// 加载编码转换模块
var iconv = require('iconv-lite');

// /**
//  * 读取路径信息
//  * @param {string} path 路径
//  */
// function getStat(path){
//     return new Promise((resolve, reject) => {
//         fs.stat(path, (err, stats) => {
//             if(err){
//                 resolve(false);
//             }else{
//                 resolve(stats);
//             }
//         })
//     })
// }
//
// /**
//  * 创建路径
//  * @param {string} dir 路径
//  */
// function mkdir(dir){
//     return new Promise((resolve, reject) => {
//         fs.mkdir(dir, err => {
//             if(err){
//                 resolve(false);
//             }else{
//                 resolve(true);
//             }
//         })
//     })
// }
//
// /**
//  * 路径是否存在，不存在则创建
//  * @param {string} dir 路径
//  */
// async function dirExists(dir){
//     let isExists = await getStat(dir);
//     //如果该路径且不是文件，返回true
//     if(isExists && isExists.isDirectory()){
//         return true;
//     }else if(isExists){     //如果该路径存在但是文件，返回false
//         return false;
//     }
//     //如果该路径不存在
//     let tempDir = path.parse(dir).dir;      //拿到上级路径
//     //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
//     let status = await dirExists(tempDir);
//     let mkdirStatus;
//     if(status){
//         mkdirStatus = await mkdir(dir);
//     }
//     return mkdirStatus;
// }




//文件写入
function writeFile(file, str) {
    return new Promise((resolve, reject) => {
        // 把中文转换成字节数组
        let arr = iconv.encode(str, 'utf8');
        // appendFile，如果文件不存在，会自动创建新文件
        // 如果用writeFile，那么会删除旧文件，直接写新文件
        fs.writeFile(file, arr, function (err) {
            if (err) {
                console.log("fail " + err);
                reject(err)
            } else {
                console.log("文件写入成功:"+file)
                resolve("成功写入文件:" + file )
            }
        });
    });
}

module.exports ={
    // dirExists:dirExists,
    writeFile:writeFile
}