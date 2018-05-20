#nginx相关操作
mac装了两个nginx~


## Nginx配置信息相关配置


网站文件存放默认目录

`/usr/share/nginx/html`

网站默认站点配置

`/etc/nginx/conf.d/default.conf`

自定义Nginx站点配置文件存放目录

`/etc/nginx/conf.d/`

Nginx全局配置

`/etc/nginx/nginx.conf`


## mac 
nginx log目录:

`/usr/local/var/log/nginx`

`/usr/local/etc/nginx`

## nginx 配置 location
[nginx配置location总结及rewrite规则写法](http://seanlook.com/2015/05/17/nginx-location-rewrite/)

[nginx的location配置详解](https://blog.csdn.net/tjcyjd/article/details/50897959)


## CentOS 7 yum 安装 Nginx
### 1.添加Nginx到YUM源
添加CentOS 7 Nginx yum资源库,打开终端,使用以下命令:

`sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm`
### 2.安装Nginx
在你的CentOS 7 服务器中使用yum命令从Nginx源服务器中获取来安装Nginx：

`sudo yum install -y nginx`
Nginx将完成安装在你的CentOS 7 服务器中。

### 3.启动Nginx
刚安装的Nginx不会自行启动。运行Nginx:

`sudo systemctl start nginx.service`
如果一切进展顺利的话，现在你可以通过你的域名或IP来访问你的Web页面来预览一下Nginx的默认页面；

![nginx default](http://images.statics.9696e.com/wp-content/uploads/2014/11/nginx_default.png)

如果看到这个页面,那么说明你的CentOS 7 中 web服务器已经正确安装。

CentOS 7 开机启动Nginx
`sudo systemctl enable nginx.service`
更多systemctl命令可查看《[systemctl命令用法](http://www.9696e.com/archives/1253)》


Nginx启动

`nginx -c nginx.conf`

在这里你可以改变设置用户运行Nginx守护程序进程一样,和工作进程的数量得到了Nginx正在运行,等等。
Linux查看公网IP
您可以运行以下命令来显示你的服务器的公共IP地址:

`ip addr show eth0 | grep inet | awk '{ print $2; }' | sed 's/\/.*$//'`





## 相关目录
 - nginx安装文件目录

`/usr/local/Cellar/nginx`

- nginx配置文件目录

`/usr/local/etc/nginx`

- config文件目录

`/usr/local/etc/nginx/nginx.conf`

- 系统hosts位置

`/private/etc/hosts`

- 看日志 

`/usr/local/nginx/logs或/var/log/nginx`目录下找到`access.log`和`error.log`
## nginx常用命令

- nginx  #启动nginx
- nginx -s quit  #快速停止nginx
- nginx -V #查看版本，以及配置文件地址
- nginx -v #查看版本
- nginx -s reload|reopen|stop|quit   #重新加载配置|重启|快速停止|安全关闭nginx
- nginx -h #帮助
- sudo nginx -s stop
- nginx -t 测试配置
- ngnix -s reload
- brew uninstall nginx  卸载nginx

## 配置文件结构
```
// 简单指令
root /data/www;
```
## 配置代理服务器
```
# 省略其它代码...
http {
    # 省略其它代码...    
    #gzip  on;
  
    server{
        listen 8080;
        root /data/up1;
        
        location / {            
        }
    }

    server{
        location / {
            proxy_pass http://localhost:8080;
        } 
        #//用于匹配.gif、.jpg、.png后缀的图片请求。       
        location ~ \.(gif|jpg|png)$ {  //
            root /data/images; 
        }
    }
    include /etc/nginx/conf.d/*.conf;
}
```
## nginx 一个ip配置多个网站

```
server {
    listen 80 default_server;
    server_name _;
    return 444; # 过滤其他域名的请求，返回444状态码
}
server {
    listen 80;
    server_name www.aaa.com; # www.aaa.com域名
    location / {
        proxy_pass http://localhost:8080; # 对应端口号8080
    }
}
server {
    listen 80;
    server_name www.bbb.com; # www.bbb.com域名
    location / {
        proxy_pass http://localhost:8081; # 对应端口号8081
    }
}
```

## Access-Control-Allow-Origin 跨域问题

```
<!--在nginx.conf中配置-->  
http {  
  ......  
   add_header Access-Control-Allow-Origin *;  
  add_header Access-Control-Allow-Headers X-Requested-With;  
   add_header Access-Control-Allow-Methods GET,POST,OPTIONS;  
  ......  
 }  
 ```
 
 
 # todoList
 
- [ ] [Nginx能为前端开发带来什么？](http://imweb.io/topic/56386972d12b230c26e1a17d)
- [ ] [Nginx 反向代理解决前后端联调跨域问题](https://cloud.tencent.com/developer/article/1075355)
- [ ] [搞懂nginx的rewrite模块](https://segmentfault.com/a/1190000008102599)
- [ ] [实战开发一个Nginx扩展 (Nginx Module)](https://segmentfault.com/a/1190000009769143)
 - [x] 
 
 
 
## 坑
1. 2018/05/08 11:40:12 [error] 24296#0: *6201 kevent() reported that connect() failed (61: Connection refused) while connecting to upstream, client: 127.0.0.1, server: triage.allinmed.cn, request: "GET / HTTP/1.1", upstream: "http://10.0.1.128:8010/", host: "triage.allinmed.cn"
bogon:nginx allin$ cd ..

 
 
 
 
 
 ## 当前配置
 ```
 worker_processes  1;
events {
    worker_connections  1024;
}
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
    gzip  on;
    #一个server块
    server {
        #服务器监听的端口为80
        listen       80;
        #服务器名称为localhost，我们可以通过localhost来访问这个server块的服务
        server_name  localhost;
        #location块，它存放在server块当中，location会尝试根据用户请求中的URI来匹配上面的/uri表达式，如果可以匹配，就选择location {}块中的配置来处理用户请求。
        location / {
            #以root方式设置资源路径，它与alias的不同请见下面的 http模块中文件路径定义
         proxy_pass http://localhost:8010;
            #root /Users/allin/workspaces/fenzhen_allinmed;
                #默认访问的页面，从左依次找到右，直到找到这个文件，然后返回结束请求
            #index  index.html index.htm;
            #设置错误页面，对应的错误码是404，错误页面是/Users/user/Sites/404.html
            #error_page 404  /404.html;
        }
    }
    server  {
         listen 8010;
         location / {
             root /Users/allin/workspaces/serverSliderRerderer/fenzhen_allinmed;
             index index.html index.htm;
        }
    }


    include servers/*;
}
 ```
 
 
 
 ## 默认配置
 
 ``` 
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

  } 
    proxy_set_header Host  $http_host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_pass http://127.0.0.1:8687;
  location / {

  add_header 'Access-Control-Allow-Methods' 'GET,POST,HEAD';
  add_header 'Access-Control-Allow-Credentials' 'true';
  add_header 'Access-Control-Allow-Origin' '*';

  server_name arthas.allinmd.cn;
  listen 8687;
server {

    }
        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
 ```
 
 
 
 
 
```

server
  {
    listen      80;
    server_name triage.allinmed.cn;
 #   rewrite ^(.*)$  https://$host$1 permanent;
    location ~ ^/apple-app-site-association {
                default_type application/pkcs7-mime;
                proxy_pass http://192.168.1.53;
                proxy_set_header Host  $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                }

location ~ ^/ {

                 proxy_pass http://10.0.1.128:8010;
                  proxy_set_header Host  $host;
                  proxy_set_header X-Real-IP $remote_addr;
                  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                }




        location ~ ^/plugins/{
                  proxy_pass http://192.168.1.53;
                  proxy_set_header Host  $host;
                  proxy_set_header X-Real-IP $remote_addr;
                  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                }


        location ~* \.(htm|html|js|css|mp3|gif|jpeg)$ {
        #proxy_pass http://192.168.1.53;
        try_files $uri $uri/ /index.html;
        proxy_pass http://10.0.1.128:8010;
        proxy_redirect          off;
        proxy_set_header        Host $host;
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For   $proxy_add_x_forwarded_for;
        client_max_body_size    20m;
        client_body_buffer_size 128k;
        proxy_connect_timeout   300;
        proxy_send_timeout      300;
        proxy_read_timeout      300;
        proxy_buffer_size       32k;
        proxy_buffers           4 64k;
        proxy_busy_buffers_size 64k;
        proxy_temp_file_write_size 128k;

#       if ($request_uri ~* (^\/|\.html|)$) {
#       add_header    Cache-Control no-cache;
#       }
#        expires 24h;
       }
        location ~ ^/call/qiniu/storage/{
          proxy_pass http://dynamic-web-allinmedpC;
          proxy_set_header Host  $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          client_max_body_size    2G;
          proxy_connect_timeout   3000;
          proxy_send_timeout      3000;
          proxy_read_timeout      3000;
          client_body_buffer_size 128k;
       }

    location ~ ^/call/{
        proxy_pass http://dynamic-web-allinmedPC;
        proxy_set_header Host  $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        client_max_body_size    20m;
        proxy_connect_timeout   300;
        proxy_send_timeout      300;
        proxy_read_timeout      300;
        client_body_buffer_size 128k;
       }

     location ~ .*\.(php|jsp|cgi)?$ {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://dynamic-web-allinmedPC;
        }
        error_page 404 = /;
    #access_log  /usr/local/nginx/logs/access.log;
    #error_log   /usr/local/nginx/logs/error.log;
}


```

