#nginx相关操作

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


