#eggjs

## eggjs获取ip地址

###只要在egg的config里面设置

```
config.proxy = true
```

###nginx配置

```
upstream app_yourdomain {
    server 127.0.0.1:7070;
}

server {
    listen 8181;

    # pass the request to the node.js server with the correct headers
    # and much more can be added, see nginx config options
    location / {
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_set_header X-NginX-Proxy true;

      proxy_pass http://app_yourdomain/;
      proxy_redirect off;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
    }
 }
```
###controler代码
```
 const ctx = this.ctx;
    const clientIP = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
    this.ctx.body = `Hello World ${clientIP}`;

```
https://eggjs.org/zh-cn/basics/controller.html#ctxhost

nginx 那边要配 X-Forwarded-For，egg 这边开启 config.proxy