/**
 * @Desc：城市首字母
 * @Usage:
 * @Notify：
 * @Depend：
 * Created by WangNing on 2018/6/11.
 */
const csvFilePath = 'district-standard.csv';
const csv = require('csvtojson');
const fs = require('fs');
// 设置编码格式
let districtFileData = fs.readFileSync(csvFilePath, {
    encoding: 'utf-8'
});

// 读取文件成功
let result = districtFileData.toString().replace(/\t/g, ',');

csv({
    noheader: true,
    output: "csv"
})
    .fromString(result)
    .then((csvRow) => {


        //处理城市库数据
        let districtData = []; //库数据
        //  [ '98', '渝北', '4', 'y', 'yb', 'yubei', '区', '500112', '12' ],
        for (var i = 0; i < csvRow.length; i++) {
            var a = [];
            a.push(csvRow[i][1]);
            a.push(csvRow[i][3]);
            a.push(csvRow[i][3].charCodeAt()-97);//增加与a的ASCII对比
            districtData.push(a)
        }
        writeFile("districtData.json", districtData);


        //处理12306数据
        //https://kyfw.12306.cn/otn/resources/js/framework/station_name.js
        let FileContent = fs.readFileSync('12306.js', {
            encoding: 'utf-8'
        }).replace("var station_names ='", "");
        let data12306 = FileContent.split('@'),
            array12306 = [];//最终的12306数据
        //从1开始因为第一个为null
        for (var i = 1; i < data12306.length; i++) {
            let dataTwo = data12306[i].split("|");
            var dataThree = [];
            dataThree.push(dataTwo[1]);
            dataThree.push(dataTwo[0].substring(0, 1));
            dataThree.push(dataTwo[0].substring(0, 1).charCodeAt()-97);//增加与a的ASCII对比
            array12306.push(dataThree)
        }
        writeFile("12306Data.json", array12306);


        // 12306不在库里面
        var notInDistrictData = [];
        for (var i = 0; i < array12306.length; i++) {
            var isInIt = false;
            for (var j = 0; j < districtData.length; j++) {
                if (districtData[j][0] === array12306[i][0]) {
                    isInIt = true;
                    //数据比对
                    //如果城市字库的拼音与12306字库不匹配
                    if (districtData[j][1] !== array12306[i][1]) {
                        console.log("数据不匹配需要处理=====")
                        console.error(districtData[j][0]);
                        console.log("数据不匹配需要处理------")
                    }
                }
            }
            if (!isInIt) {
                var isInItData = [];
                isInItData.push(array12306[i][0]);
                isInItData.push(array12306[i][1]);
                isInItData.push(array12306[i][2]);
                notInDistrictData.push(isInItData)
            }
        }
        writeFile("notInDistrictData.json", notInDistrictData);


        // 库里面不在12306中的
        var notIn12306Data = [];
        for (var i = 0; i < districtData.length; i++) {
            var isInIt = false;
            for (var j = 0; j < array12306.length; j++) {
                if (array12306[j][0] === districtData[i][0]) {
                    isInIt = true
                }
            }
            if (!isInIt) {
                var isInItData = [];
                isInItData.push(districtData[i][1]);
                isInItData.push(districtData[i][0]);
                notIn12306Data.push(isInItData)
            }
        }

        writeFile("notIn12306Data.json", notIn12306Data);


        // 不在12306中的数据 排除 东南西北
        // 12306不在库里面
        var finalResult = districtData;
        for (var i = 0; i < notInDistrictData.length; i++) {
            var notIn = ["东", "西", "南", "北"];
            var isInIt = false;
            for (var j = 0; j < notIn.length; j++) {
                if (notInDistrictData[i][0].indexOf(notIn[j]) !== -1) {
                    isInIt = true
                }
            }
            if (!isInIt) {
                var isInItData = [];
                // console.log(notInDistrictData[i][0]);
                isInItData.push(notInDistrictData[i][0]);
                isInItData.push(notInDistrictData[i][1].substring(0, 1));
                finalResult.push(isInItData)
            }
        }
        // todo 解决写入js文件解析为字符串
        fs.writeFileSync("../../fisrt_letter_for_city/finalResult.js", "/**\n" +
            " * @Desc：返回城市首字母,用来减少对城市中多音字的影响\n" +
            " * @Usage: 直接引用\n" +
            " * @Depend：null\n" +
            " *\n" +
            " * Created by 王宁 on 2018/6/19\n" +
            " */\n" +
            "window && window.firstLetterForCity=" + JSON.stringify((finalResult)), {
            flag: 'w',
            encoding: 'utf-8',
            mode: '0666'
        });

    });

function writeFile(file, data) {
    //文件写入
    fs.writeFile(file, JSON.stringify(data), {
        flag: 'w',
        encoding: 'utf-8',
        mode: '0666'
    }, function (err) {
        if (err) {
            console.log("文件" + file + "写入失败")
        } else {
            console.log("文件" + file + "写入成功");
        }
    })
}