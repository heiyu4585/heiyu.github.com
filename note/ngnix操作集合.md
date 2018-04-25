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

## nginx常用命令

- nginx  #启动nginx
- nginx -s quit  #快速停止nginx
- nginx -V #查看版本，以及配置文件地址
- nginx -v #查看版本
- nginx -s reload|reopen|stop|quit   #重新加载配置|重启|快速停止|安全关闭nginx
- nginx -h #帮助
- sudo nginx -s stop(
- nginx -t 测试配置
- ngnix -s reload
- brew uninstall nginx  卸载nginx


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


