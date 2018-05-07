#pm2 相关

## 常用命令

### 安装pm2
`npm install -g pm2`

### 启动应用
`pm2 start app.js`
### 列出所有应用
`pm2 list`
### 查看资源消耗
`pm2 monit`
### 查看某一个应用状态
`pm2 describe [app id]`
### 查看所有日志
`pm2 logs`
### 重启应用
`pm2 restart [app id]`
### 停止应用
`pm2 stop [app id]`
### 开启api访问
`pm2 web`


### 预定义运行配置文件
我们可以预定义一个配置文件，然后制定运行这个配置文件，比如我们定义一个文件process.json，内容如下：

```
{
  "apps": [
    {
      "name": "ANodeBlog",
      "script": "bin/www",
      "watch": "../",
      "log_date_format": "YYYY-MM-DD HH:mm Z"
    }
  ]
}
```
然后可以通过

`pm2 start process.json`
运行这个App。


pm2支持配置文件启动：
pm2 ecosystem： 生成配置文件ecosystem.json
pm2 startOrRestart /file/path/ecosystem.json : 通过配置文件启动服务

如下是开发时ecosystem.json的内容：

```
{
    /**
    * Application configuration section
    * http://pm2.keymetrics.io/docs/usage/application-declaration/
    * 多个服务，依次放到apps对应的数组里
    */
    apps : [
    // First application
        {
            name      : "nova",
            max_memory_restart: "300M",
            script    : "/root/nova/app.js",
            out_file : "/logs/nova_out.log",
            error_file : "/logs/nova_error.log",
            instances  : 4,
            exec_mode  : "cluster",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
 }
 ```
 
上述采用cluster模式启动了4个服务进程；如果服务占用的内存超过300M，会自动进行重启。

 配置项
 
```
name  应用进程名称；

script  启动脚本路径；

cwd  应用启动的路径，关于script与cwd的区别举例说明：在/home/polo/目录下运行/data/release/node/
index.js，此处script为/data/release/node/index.js，cwd为/home/polo/；

args  传递给脚本的参数；

interpreter  指定的脚本解释器；

interpreter_args  传递给解释器的参数；

instances  应用启动实例个数，仅在cluster模式有效，默认为fork；

exec_mode  应用启动模式，支持fork和cluster模式；

watch  监听重启，启用情况下，文件夹或子文件夹下变化应用自动重启；

ignore_watch  忽略监听的文件夹，支持正则表达式；

max_memory_restart  最大内存限制数，超出自动重启；

env  环境变量，object类型，如{"NODE_ENV":"production", "ID": "42"}；

log_date_format  指定日志日期格式，如YYYY-MM-DD HH:mm:ss；

error_file  记录标准错误流，$HOME/.pm2/logs/XXXerr.log)，代码错误可在此文件查找；

out_file  记录标准输出流，$HOME/.pm2/logs/XXXout.log)，如应用打印大量的标准输出，会导致pm2日志过大；

min_uptime  应用运行少于时间被认为是异常启动；

max_restarts  最大异常重启次数，即小于min_uptime运行时间重启次数；

autorestart  默认为true, 发生异常的情况下自动重启；

cron_restart  crontab时间格式重启应用，目前只支持cluster模式；

force  默认false，如果true，可以重复启动一个脚本。pm2不建议这么做；

restart_delay  异常重启情况下，延时重启时间；

```

### 稳定运行建议
PM2是一款非常优秀的Node进程管理工具，它有着丰富的特性：能够充分利用多核CPU且能够负载均衡、能够帮助应用在崩溃后、指定时间(cluster model)和超出最大内存限制等情况下实现自动重启。

个人几点看法保证常驻应用进程稳定运行：

	定时重启，应用进程运行时间久了或许总会产生一些意料之外的问题，定时可以规避一些不可测的情况；

	最大内存限制，根据观察设定合理内存限制，保证应用异常运行；

	合理min_uptime，min_uptime是应用正常启动的最小持续运行时长，超出此时间则被判定为异常启动；

	设定异常重启延时restart_delay，对于异常情况导致应用停止，设定异常重启延迟可防止应用在不可测情况下	不断重启的导致重启次数过多等问题；

	设置异常重启次数，如果应用不断异常重启，并超过一定的限制次数，说明此时的环境长时间处于不可控状态，服务器异常。此时便可停止尝试，发出错误警告通知等。

关于pm2的使用，主要还是运用于常驻脚本。 

 


## 资料

[pm2官方文档](http://pm2.keymetrics.io/docs/usage/quick-start/)

[关于Node进程管理器PM2使用技巧和需要注意的地方 ](https://github.com/jawil/blog/issues/7)
