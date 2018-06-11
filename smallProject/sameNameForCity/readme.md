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

[拆分单元格](https://support.office.com/zh-cn/article/%E6%8B%86%E5%88%86%E5%8D%95%E5%85%83%E6%A0%BC-f1804d0c-e180-4ed0-a2ae-973a0b7c6a23)



Excel在读取csv的时候是通过读取文件头上的bom来识别编码的，如果文件头无bom信息，则默认按照unicode编码读取。（这个bom是微软自己定义的一种文件头部协定，
顾名思义存储在文件头部，存储内容就是标识文件编码的信息。）
而我们生成csv的平台不一定遵循微软的bom协议，导致如果输出非unicode编码的csv文件（例如utf-8），并且没有生成bom信息的话，
Excel自动按照unicode编码读取，就会出现乱码问题了。掌握了这点相信乱码已经无法阻挡我们前进的步伐了：
只需将非unicode编码的csv文件，
用文本编辑器（推荐notepad++）打开并转换为带bom的编码形式（具体编码方式随意），问题解决。


```
原因是 Excel 以 ANSI 格式打开，不会做编码识别。
打开 UTF-8 编码的 CSV 文件的方法：

1) 打开 Excel 

2) 执行“数据”->“自文本”

3) 选择 CSV 文件，出现文本导入向导

4) 选择“分隔符号”，下一步

5) 勾选“逗号”，去掉“ Tab 键”，下一步，完成

6）在“导入数据”对话框里，直接点确定
```
---

解决思路:

1.提供 12306Data.json
2.提供库文件 districtData.json

大概思路
1.12306文件的数据源是12306官方网站提供
2.git库 包括了中国各省/自治区/直辖市、市/自治州/盟/地区、区/县/县级市/旗数据
