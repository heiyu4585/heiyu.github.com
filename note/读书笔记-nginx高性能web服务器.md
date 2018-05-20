#读书笔记-nginx高性能web服务器
## nginx服务的起停控制

`cat nginx.pid`     //未成功

`ps -ef|grep nginx`


-? -h 显示帮助信息
-v 打印版本号并退出
-V 打印版本号和配置并退出
-t 测试配置是否正确并退出
-q 测试配置时,只显示错误
-s singnal 向主进程发送信号
-p prefile 指定nginx服务器路径前缀
-c filename 指定nginx配置文件路径
-g directives 指定nginx附加配置文件路径


命令拆解：

```
ps:将某个进程显示出来
-A 　显示所有程序。 
-e 　此参数的效果和指定"A"参数相同。
-f 　显示UID,PPIP,C与STIME栏位。 
grep命令是查找
中间的|是管道命令 是指ps命令与grep同时执行
这条命令的意思是显示有关Apachejetspeed有关的进程
```

UID： 程序被该 UID 所拥有

PID ：就是这个程序的 ID

PPID ：则是其上级父程序的ID

C： CPU 使用的资源百分比

STIME ：系统启动时间

TTY： 登入者的终端机位置

TIME： 使用掉的 CPU 时间

CMD ：所下达的指令为何

 - `worker_processes 3;` 并发处理服务

 - `pid file`  配置pid存放路径
 
 - `error_log file| stderr [debug|info|notice |warn |error |crit |alert |emerg]`  错误日志配置
 
 - `include_file;`  //配置文件的引入
 
 - `accept_mutex on|off;`  //设置网络连接的序列化  ("惊群问题")
 
 - `multi_accept on|off;`  //设置允许访问同时接受多个网络连接
 
 - `use method;` // select,poll,kqueue,epoll,rtsig ,/dev/poll/eventprot //时间驱动模型选择
 - `worker_connectons number; ` //默认512 配置最大连接数
 
 - 定义 MIME-Type
 
 ```
 include mime.types;
 default_type application/octet-stream;
 ``` 
 
 W
 
 
 