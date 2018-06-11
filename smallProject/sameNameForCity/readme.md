 * 使用库 https://github.com/Keyang/node-csvtojson
 * 数据源 https://github.com/eduosi/district
          https://kyfw.12306.cn/otn/resources/js/framework/station_name.js

执行方法:`node app`

最终结果为:`finalResult.json`
12306结果: `12306Data.json`
库结果  :  `districtData.json`
库不在12306中: ` notIn12306Data.json`
12306不在库中: ` notInDistrictData.json`

 ## 遇到的问题
 1. excel乱码
 用wps打开正常，如何分割单元格

 解决方法 ：替换全部的 /t 制表符

---

解决思路:

1.提供 12306Data.json
2.提供库文件 districtData.json

大概思路
1.12306文件的数据源是12306官方网站提供
2.git库 包括了中国各省/自治区/直辖市、市/自治州/盟/地区、区/县/县级市/旗数据
