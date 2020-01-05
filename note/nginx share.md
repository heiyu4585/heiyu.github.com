# nginx 

## nginx 是什么
## 为什么要用nginx
## nginx简单概念
## 前端遇到的场景

复制文件

```
$cp -f /Users/allin/workspaces/nginxShare/nginxConfig/test.conf /usr/local/etc/nginx/test.conf
$sudo nginx -c /usr/local/etc/nginx/test.conf 
$sudo nginx -c /usr/local/etc/nginx/test.conf -s reload

```


cp -f /Users/allin/workspaces/nginxShare/nginxConfig/myNginx.conf /usr/local/etc/nginx/myNginx.conf
$sudo nginx -c /usr/local/etc/nginx/myNginx.conf 
$sudo nginx -c /usr/local/etc/nginx/myNginx.conf -s reload


#### 提供静态内容服务(静态网站)

```
##demo基础搭建
-backEnd 后端   ip:7002
-fontEnd 前端   ip:8082
```

展示结果

- ip:80   路径 
- /fontEnd/dist

```
#工作模式及连接数上限
events { 
  worker_connections  1024;  ##单个后台进程的最大并发数
}
#设定http服务器，利用它的反向代理功能提供负载均衡支持
http{
	server {
	    location / {
	    
	    }
	}
}

```

  - 网站根目录
 
 `root /Users/allin/workspaces/nginxShare/frontEnd/dist;`
 
  - 本地用域名访问
  
  `server_name www.front-end.com;`
	`配置host`
	
  - 入口设置
   
  ```
	index  list.html index.html index.htm; #默认访问文件
  ```
  
  -404
  
    ` error_page 404 = /404.html;`
    `error_page 404 http://www.baidu.com;`
  ` error_page 404 = /fetch$uri;`
  
结果

```
events {
  worker_connections  1024;  ## Default: 1024
}
http{
    server {
        server_name www.front-end.com;
        location / {
            root /Users/allin/workspaces/nginxShare/frontEnd/dist;
            index  list.html index.html index.htm; #默认访问文件
        }
    }
}
```


#### 静态资源分离

```
<img src="./static/images/nginx.jpg" alt="">

       #静态文件，nginx自己处理
	location ~ \.(gif|jpg|png)$ {
		root /Users/allin/workspaces/nginxShare/frontEnd/dist/static/images;
	}

<img src="nginx.jpg" alt="">
```


#### 反向代理--域名访问开发端口
```
http{
    #front-end
    upstream zp_server1{
        server 10.0.1.128:8081;
    }
    server {
		....	
        location / {
             proxy_pass http://zp_server1;
        }
    }
}
```
#### 反向代理--转发
url: "/list",
 
```
  #back-end
    upstream back_server{
        server 10.0.1.128:7001;
    }
    
    
	location /list/ {
	      proxy_set_header Host $host:$server_port;
	      proxy_pass http://back-end;
	}
```
 
#### 反向代理--根据规则转发
 
 url: "/api/list",
 
```
		#back-end
		upstream back_server{
		    server 10.0.1.128:7001;
		}
	    
		location /api/ {
			proxy_set_header Host $host:$server_port;
			rewrite   ^/api/(.*)$ /$1 break;
			proxy_pass http://back_server;
		}
```

查看 8001端口

查看 dist目录

#### nginx如何查看日志

```
http{

	#全局错误日志
	error_log   /usr/local/etc/nginx/log/error.log;
	error_log  /usr/local/etc/nginx/log/notice.log  notice;
	
	 log_format compression '$remote_addr - $remote_user [$time_local] '
	                               '"$request" $status $body_bytes_sent '
	                               '"$http_referer" "$http_user_agent" "$gzip_ratio"';
                               
      server {                     
       access_log /usr/local/etc/nginx/log/front-end.log compression;                         
                               
```

##坑 

### nginx代理 webpack-dev-server环境 Invalid Host header

1. disableHostCheck: true       在devserver下，proxy同级加入这个就行
2. 执行 webpack-dev-server 命令时手动添加 --public 选项，取值为授权的 host，这是官方建议的做法，目的是为了安全。(未验证)



## 参考

[前端工程师学习Nginx入门篇](http://cnt1992.xyz/2016/03/18/simple-intro-to-nginx/)

[nginx平台初探](http://tengine.taobao.org/book/chapter_02.html#id13)

[Nginx从源码构建安装配置](https://www.yiibai.com/nginx/configure.html)

[Nginx基础教程PPT](https://blog.csdn.net/MDL13412/article/details/26397881)

[最全面 Nginx 入门教程 + 常用配置解析](https://blog.csdn.net/shootyou/article/details/6093562)

[nginx入门教程](https://blog.csdn.net/yudiandemingzi/article/details/80204841)

[Nginx 简易教程](http://www.cnblogs.com/jingmoxukong/p/5945200.html)