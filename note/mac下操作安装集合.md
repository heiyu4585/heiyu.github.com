



## Mac下安装 MongoDB
    更为简单的方法：
    通过 homebrew 安装：brew install mongodb
    如果报错：
    mongodb: A full installation of Xcode.app 8.3.2 is required to compile this software.
    Installing just the Command Line Tools is not sufficient.
    Xcode can be installed from the App Store.
    Error: An unsatisfied requirement failed this build.

    说明Xcode版本过低，需要更新，如果你不想更新，可以通过使用命令：
    homebrew search mongodb
    查看更低版本的MongoDB，然后安装更低版本的MongoDB。
    brew install mongodb@3.4
    启动MongoDB服务：
    brew services start mongodb@3.4
    关闭MongoDB服务：
    brew services stop mongodb@3.4
    进入MongoDB图形化界面：
    mongo
    查看homebrew安装的服务情况：
    brew services list

    http://www.cnblogs.com/weixuqin/p/7258000.html

    环境变量

    vim ~/.bash_profile
    //添加mongodb安装目录到环境变量中
    export PATH=/usr/local/Cellar/mongodb/2.4.9/bin:${PATH}
    //添加mongodb安装目录到环境变量中
    export PATH=/usr/local/Cellar/mongodb/2.4.9/bin:${PATH}
    4.修改mongodb配置文件,配置文件默认在 /usr/local/etc 下的 mongod.conf
    # Store data in /usr/local/var/mongodb instead of the default /data/db
    dbpath = /data/db

    # Append logs to /usr/local/var/log/mongodb/mongo.log
    logpath = /usr/local/var/log/mongodb/mongo.log
    logappend = true

    # Only accept local connections
    bind_ip = 127.0.0.1
    第二行修改成数据库文件写入目录地址,如果准备连接非本地环境的mongodb数据库时,bind_ip = 0.0.0.0 即可.

[mac 下用 brew 安装mongodb](http://yijiebuyi.com/blog/b6a3f4a726b9c0454e28156dcc96c342.html)

图形化工具  robo 3t 3.4.13  mac 版本

## Mac环境下Nginx实现反向代理

### 安装
`brew install nginx`
### 查看Nginx安装的版本
`$ nginx -v`
### Nginx常用的命令有

    #查看版本，以及配置文件地址
    nginx -V
    #查看版本
    nginx -v
    #指定配置文件
    nginx -c filename
    #帮助
    nginx -h
    #重新加载配置|重启|停止|退出 nginx
    nginx -s reload|reopen|stop|quit
    #打开 nginx
    sudo nginx
    #测试配置是否有语法错误
    sudo nginx -t
### Nginx配置WEB服务器

使用Nginx做反向代理，我们需要了解一下Nginx中http模块的配置。

编辑Nginx配置文件
`$ sudo vim /usr/local/etc/nginx/nginx.conf`
找到http模块，修改http模块中的listen为80，如下：
```
http {
    #导入类型配置文件
    include       mime.types;
    #设定默认类型为二进制流
    default_type  application/octet-stream;
    #启用sendfile()函数
    sendfile        on;
    #客户端与服务器连接的超时时间为65秒，超过65秒，服务器关闭连接
    keepalive_timeout  65;
    #是否开启gzip，默认关闭
    #gzip  on;
    #一个server块
    server {
        #服务器监听的端口为80
        listen       80;
        #服务器名称为localhost，我们可以通过localhost来访问这个server块的服务
        server_name  localhost;
        #location块，它存放在server块当中，location会尝试根据用户请求中的URI来匹配上面的/uri表达式，如果可以匹配，就选择location {}块中的配置来处理用户请求。
        location / {
            #以root方式设置资源路径，它与alias的不同请见下面的 http模块中文件路径定义
            root   html;
            #默认访问的页面，从左依次找到右，直到找到这个文件，然后返回结束请求
            index  index.html index.htm;
            #设置错误页面，对应的错误码是404，错误页面是/Users/user/Sites/404.html
            error_page 404  /404.html;
        }
    }
    include servers/*;
}
```
#### http模块中文件路径定义：
1、以root方式设置资源路径
语法: root path;
默认: root html;
配置块: http, server, location, if
例如，定义资源文件相对于HTTP请求的根目录。

    location /download/ {
        root /opt/web/html;
    }
在上面的配置中，如果有一个请求的URI是/download/index/test.html，那么Web服务器将会返回服务器上/opt/web/html/download/index/test.html文件的内容。

2、以alias方式设置资源路径
语法：alias path;
配置块：location
alias也是用来设置文件资源路径的，它与root的不同点主要在于如何解读紧跟location后面的uri参数，这将会致使alias与root以不同的方式将用户请求映射到真正的磁盘文件上。
例如，如果有一个请求的URI是/conf/nginx.conf，而用户实际想访问的文件在/usr/local/nginx/conf/nginx.conf，那么想要使用alias来进行设置的话，可以采用如下方式：

    location /conf {
        alias /usr/local/nginx/conf/;
    }
如果用root设置，那么语句如下所示：

    location /conf {
        alias /usr/local/nginx/;
    }
使用alias时，在URI向实际文件路径的映射过程中，已经把location后配置的/conf这部分字符串丢弃掉，因此，/conf/nginx.conf请求将根据alias path映射为path/nginx.conf。root则不然，它会根据完整的URI请求来映射，因此/conf/nginx.conf请求会根据root path映射为path/conf/nginx.conf。这也是root可以放置到http、server、location或if块中，而alias只能放置到location块中的原因。
alias后面还可以添加正则表达式，例如：

    location ~ ^/test/(\w+)\.(\w+)$ {
        alias /usr/local/nginx/$2/$1.$2;
    }
这样，请求在访问/test/nginx.conf时，Nginx会返回/usr/local/nginx/conf/nginx.conf文件中的内容。

开启Nginx的Web服务
开启Nginx服务之前，如果我们开启了Apache服务，那么我需要先关闭Apache服务

    #开启Nginx
    $ sudo nginx
使用localhost来访问，若是出现nginx欢迎页，说明成功。

### 3、使用Nginx做反向代理
反向代理（reverse proxy）方式是指用代理服务器来接受Internet上的连接请求，然后将请求转发给内部网络中的上游服务器，并将从上游服务器上得到的结果返回给Internet上请求连接的客户端，此时代理服务器对外的表现就是一个Web服务器。
这里，我是在本机搭建，通过修改host来模拟多个域名访问本机的nginx。

#### 1、修改hosts文件
$ vim /etc/hosts
在内部添加域名解析

    127.0.0.1 pinger.com www.pinger.com
    127.0.0.1 test.com www.test.com
    127.0.0.1 chungui.com www.chungui.com
2、修改nginx配置文件
$ sudo vim /usr/local/etc/nginx/nginx.conf
在后面添加server模块，内部通过proxy_pass设置反向代理

    server {
        listen  80;
        server_name  *.pinger.com pinger.com;
        location / {
            proxy_pass http://www.baidu.com;
        }
    }
    server {
        listen 80;
        server_name *.chungui.com chungui.com;
        location / {
            proxy_pass http://www.renren.com;
        }
    }
    server {
        listen 80;
        server_name test.com;
        location / {
            proxy_pass http://www.zhihu.com;
        }
    }
其中，server_name可以指向多个域名值

3、重启nginx服务
#重启服务
`$ sudo nginx -s reload`
这时，反向代理已经搭建成功。你可以在本地通过chungui.com访问到人人网，test.com访问到知乎。不过，设置pinger.com访问的http://www.baidu.com站点，而百度服务器内部会自动跳转到https://www.baidu.com站点，所以我们通过pinger.com会跳转到https://www.baidu.com，这个时候我们可以将百度的替换成https就行了，修改配置如下：

    server {
        listen       80;
        server_name  *.pinger.com pinger.com;
        location / {
            proxy_pass https://www.baidu.com;
        }
    }
这个时候，再使用pinger.com在浏览器里访问时就不会出现跳转的问题了。

[Mac下Nginx的安装和配置](http://jalan.space/2017/01/12/2017-01-13-mac-os-nginx/)

[Mac环境下Nginx实现反向代理](http://www.liuchungui.com/blog/2015/10/21/mhuan-jing-xia-nginxshi-xian-fan-xiang-dai-li/)

[Nginx 配置简述](https://www.barretlee.com/blog/2016/11/19/nginx-configuration-start/)

[nginx环境的搭建和测试](https://sanjay-f.github.io/2015/10/06/nginx%E7%8E%AF%E5%A2%83%E7%9A%84%E6%90%AD%E5%BB%BA%E5%92%8C%E6%B5%8B%E8%AF%95/)