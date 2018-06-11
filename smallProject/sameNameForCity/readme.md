 * 使用库 https://github.com/Keyang/node-csvtojson
 * 数据源 https://github.com/eduosi/district

执行方法:
`node app`

最终结果为:
`finalResult.json`

 ## 遇到的问题
 1. excel乱码
 用wps打开正常，如何分割单元格

 解决方法 ：替换全部的 /t 制表符

 2. 12306中存在一些火车站命名的车站 比如 （东，西，南，北）
  当前思路
  将12306中不在库中的文件 排除东南西北四个字后进行合并