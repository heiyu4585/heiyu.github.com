# todo list

12.4

1. mongod 查询慢 创建索引?

背景: 原来有一个插件为了兼容ie8没有用到模块化,现在想要做到模块化
思路: 
为了后期的扩展,想要用webpack3+es6做模块化
babel-loader转为es5,
es3ify-loader转为es3




1. loading 状态添加 (参考测试人员入口) 替换为原生 table
2. 时间选择器监听 change
3. 环境 安卓 /sarfiar 问题
4. ts / 分模块 问题



1. 对ua 进行格式化 分析系统和浏览器 对位置进行重新排序
5. layui 选中状态
4. 免费ip库对ip进行转化  github上查找
3. h5端查询出错修复
2. 公司ip 排除(新增一个按钮,进行筛选)   


1. https://github.com/itbdw/ip-database  下载后替换最新的ip库
2. 下载地址:http://www.cz88.net/fox/ipdat.shtml 下载数据库程序（Windows 环境）

3. 库地址 https://github.com/cnwhy/lib-qqwry 




方式一:

1.  安装私有包

```
npm install @allin/wap-share@latest  @allin/arthas_monitor_report@latest  --save --registry http://192.168.1.149:7001 --scope=@allin  
```

2. 剩余 其他包正常安装即可,不会受私有包影响

方式二:

1. 下载包复制到指定路径`http://192.168.1.149:7002/package/@allin/wap-share`,点击 `压缩包下载` 解压后将package内文件 复制到  `node_modules/@allin/wap-share`
arthas_monitor_report 同理

2.  剩余 其他包正常安装即可,不会受私有包影响