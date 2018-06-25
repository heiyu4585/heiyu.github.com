
# 拼音处理问题

## 场景 

公司有个项目中对于城市的按首字母排序,有多音字没有很好的处理


## jielun
如果是在web端用暂时的解决方案是当前的pinyin.js
如果后端用,或者本地用建议pinyin.js 或者 做 字库合并

#多音词字典

## 安装方法

`npm install @allin/polyphone-check --save --registry http://192.168.1.149:7001 --scope=@allin`

## 使用方法

```
let  allinPinYin  = require('@allin/polyphone-check');
//  获取首字母索引值
console.log( allinPinYin.getCharIndex('澳门'));//1
// 获取首字母
console.log( allinPinYin.getFirstLetter('澳门'));//A
//获取全拼音
console.log( allinPinYin.getFullPinyin('澳门'));//Ao|Men
// 获取排序后的列表
// 输入  ['北京','北安']
// 返回   [['北按','bei|an',2,'b'],['北京','bei|jing','2','b']]

console.log(allinPinYin.getSortList(['北京','天津','厦门','朝阳','重庆','澳门']));
// [ [ '澳门', 0, 'A', 'Ao|Men' ],
//     [ '北京', 1, 'B', 'Bei|Jing' ],
//     [ '朝阳', 2, 'C', 'Chao|Yang' ],
//     [ '重庆', 2, 'C', 'Chong|Qing' ],
//     [ '天津', 19, 'T', 'Tian|Jin' ],
//     [ '厦门', 23, 'X', 'Xia|Men' ] ]

```

## 字库维护
1. 在data.csv中按照已有格式新增或者修改即可
2. 执行`$ npm run build`
3. `allin/polyphone-check/package.json` 版本新增0.0.1
4. 提交修改pass项目中的git
5. npm run publish



### 字库查找
http://www.360doc.com/content/11/0727/20/178233_136211351.shtml

[挑战中国地名读音](https://wenku.baidu.com/view/de5faa49856a561253d36f1d.html)

[中国地名读音](https://wenku.baidu.com/view/ceba7cfb941ea76e58fa0443.html)

[国内容易读错的地名及正常读音](http://xh.5156edu.com/page/z8565m3135j20492.html)

[有哪些城市的名称其读音是多音字，他们有什么故事？](https://www.zhihu.com/question/26813834)




http://blog.sina.com.cn/s/blog_69192d610102wnfc.html
https://wenku.baidu.com/view/26737bef9b89680203d825f7.html
https://www.zhihu.com/question/26813834
http://www.360doc.com/content/11/0727/20/178233_136211351.shtml



## 坑

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

参考:

 [12306](https://kyfw.12306.cn/otn/resources/js/framework/station_name.js)
 [github城市库](https://github.com/eduosi/district)
 [pinyin转化](https://github.com/hotoo/pinyin)
 [js 中文转为首字母拼音] (https://blog.csdn.net/wang1988081309/article/details/64921793)