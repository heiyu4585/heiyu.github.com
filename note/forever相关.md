# forever相关

最简单粗暴的方法是使用Linux本身后台执行的特性
使用&符号后台执行，并利用nohup命令实现进程禁止挂起

nohup node app.js &

使用forever让node.js持久运行

`$ forever start --minUptime 1000 --spinSleepTime 1000  -c "npm run dev" ./`


log_server启动方式

`forever start --minUptime 1000 --spinSleepTime 1000  -c "npm run start" ./`


日志按天分割

`forever xxxx.js 2>&1 | cronolog /your/log/path/log_%Y%m%d.log`


```
	npm install forever -g   #安装
	forever start app.js  #启动应用
	forever stop app.js  #关闭应用
	forever restartall  #重启所有应用
	#输出日志和错误
	forever start -l forever.log -o out.log -e err.log app.js   

	# 指定forever信息输出文件，当然，默认它会放到~/.forever/forever.log
	forever start -l forever.log app.js  

	# 指定app.js中的日志信息和错误日志输出文件，  
	# -o 就是console.log输出的信息，-e 就是console.error输出的信息
	forever start -o out.log -e err.log app.js 

	# 追加日志，forever默认是不能覆盖上次的启动日志，  
	# 所以如果第二次启动不加-a，则会不让运行  
	forever start -l forever.log -a app.js

	# 监听当前文件夹下的所有文件改动（不太建议这样）  
	forever start -w app.js  

	# 显示所有运行的服务 
	forever list  

	######停止操作

	# 停止所有运行的node App  
	forever stopall  
  
	# 停止其中一个node App  
	forever stop app.js  

	# 当然还可以这样  
	# forever list 找到对应的id，然后：  
	forever stop [id]

	# 开发环境下  
	NODE_ENV=development forever start -l forever.log -e err.log -a app.js  
	# 线上环境下  
	NODE_ENV=production forever start -l ~/.forever/forever.log -e ~/.forever/err.log -w -a app.js
	#上面加上NODE_ENV为了让app.js辨认当前是什么环境用的
	The End
```

## 服务器脚本配置
配置
### 启动脚本 start.sh

```
	#!/bin/bash

export PATH=$PATH:`pwd`/node/bin:`pwd`/../node/bin:`pwd`/node_modules/forever/bin:/usr/local/node/bin
export NODE_ENV=${NODE_ENV:-production}
export NODE_CONFIG_DIR=`pwd`/config

SCRIPT=`pwd`/src/index.js
LOGFILE=`pwd`/run.log

running=`forever list | grep "$SCRIPT" | grep -v grep | wc -l`

if [ $running -lt 1 ]; then
    forever start --spinSleepTime=10000 --killSignal=SIGINT --pidFile=`pwd`/run.pid -l $LOGFILE -a -w --watchDirectory=`pwd`/src --watchIgnore=".svn/*" "$SCRIPT"
    echo -e "\nRunning."
else
    echo -e "\nAlready running."
fi

forever list | grep "$SCRIPT"

```

### 停止脚本 stop.sh

```
	#!/bin/bash

export PATH=$PATH:`pwd`/node/bin:`pwd`/../node/bin:`pwd`/node_modules/forever/bin:/usr/local/node/bin

SCRIPT=`pwd`/src/index.js

forever stop "$SCRIPT"
```

### 重启脚本 restart.sh

```
	#!/bin/bash

export PATH=$PATH:`pwd`/node/bin:`pwd`/../node/bin:`pwd`/node_modules/forever/bin:/usr/local/node/bin

SCRIPT=`pwd`/src/index.js

forever restart "$SCRIPT" || ./start.sh
```

### 用法
#### 启动

`./start.sh`
#### 停止

`./stop.sh`
#### 重启

`./restart.sh`
### 缺点
 - 程序退出过程中的日志无法捕获
	参见：no logging after graceful shutdown #385

	应该是forever通过信号通知程序退出后，不再捕获程序的日志输出，程序退出的这段时间内日志丢失。

	一个补丁方案：程序收到forever的退出信号后将日志直接写到日志文件（正常情况下是由forever捕获程序的错误输出写日志文件）。

 - 重启可能失败
	代码更新后，forever会发信号重启进程，但是程序始终重启不成功，出现大量下面的日志：

	`Error: bind EADDRINUSE`
	怀疑跟node.js的cluster中master自动拉起slave的行为相冲突，此时只有一个forever实例在运行，这种情况占比很高。

	另外crontab中调用start.sh也可能和forever相冲突，当node全退出时，可能启动多个forever实例，这种情况占比稍低。

	另外一种情况是node.js出问题了CPU及内存100%占用，此时普通的kill杀不死（必须得kill -9），forever误认为已成功结束node.js进程， 然后拉起新的进程。

 - 未内置支持开机启动
	可以直接放在crontab每分钟调用一次 start.sh 来实现，万一连forever进程都挂了，可以全部拉起来。 开机启动不内置则意味着一百个人有一百种做法，带来不必要的争议。

 - 允许程序同时启动多个实例
	forever未对启动的程序进行唯一性标识，导致程序可能意外启动多个实例，多个实例之间往往相冲突，降低了系统可用性。

	而由程序自已来实现单实例运行是很困难的，forever会不断地拉起退出的多余副本。

 - 未内置支持cluster以及优雅重启
	部署代码重启程序过程中会停止服务几秒钟。
	
	ps:[后台服务监护工具：forever与pm2](http://blog.kankanan.com/article/540e53f0670d52a176d162a45de55177ff1a-forever-4e0e-pm2.html)