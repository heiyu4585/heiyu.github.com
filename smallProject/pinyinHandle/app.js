/**
 * @Desc：城市首字母  数据转为json文件
 * @Usage:
 * @Notify：
 * @Depend：
 * Created by WangNing on 2018/6/11.
 */
const csv = require('csvtojson');
const fs = require('fs');

// 设置编码格式
let districtFileData = fs.readFileSync('data.csv', {
    encoding: 'utf-8'
});

csv({
    noheader: true,
    output: "csv"
})
    .fromString(districtFileData)
    .then((csvRow) => {
        console.log(csvRow);
        fs.writeFileSync("data.json", JSON.stringify((csvRow)), {
            flag: 'w',
            encoding: 'utf-8',
            mode: '0666'
        });
    });