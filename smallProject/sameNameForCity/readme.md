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

 2. 12306中存在一些火车站命名的车站 比如 （东，西，南，北）
  当前思路
  将12306中不在库中的文件 排除东南西北四个字后进行合并