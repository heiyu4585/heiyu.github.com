#HARViewer 
查看方式 index.html,
官方版本需要php环境

## 参考
HAR简介

HAR（HTTP Archive），是一个用来储存HTTP请求/响应信息的通用文件格式，基于JSON。这个格式的出现可以使HTTP监测工具以一种通用的格式导出所收集的数据，这些数据可以被其他支持HAR的HTTP分析工具（包括Firebug，httpwatch，Fiddler等）所使用，来分析网站的性能瓶颈。目前HAR规范最新版本为HAR 1.2。HAR文件必须是UTF-8编码，有无BOM无所谓。

HARViewer简介

HARViewer是一个在线工具，其目的是可视化由 HTTP 跟踪工具创建的 HTTP 档案 (HAR) 日志文件。这些文件包含HTTP请求/响应会话信息的日志，可以用于进行页面加载性能的进一步分析。

HARViewer的安装

源码下载地址：https://github.com/janodvarko/harviewer/archive/master.zip
解压后，将其中的webapp目录拷贝到showslow的安装目录中，更名为harviewer即可。
通过地址：http://192.168.1.11:8088/harviewer/访问
har1
通过Chrome可以导出har信息，复制粘贴到文本框中点击“Preview”按钮即可看到可视化的效果了。
>https://www.bstester.com/2015/12/harviewer-building

### example
>:webapp_harviewer/?har=examples/google.com.har

http://www.softwareishard.com/blog/har-viewer/