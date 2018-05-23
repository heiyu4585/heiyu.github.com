#apache2

## apache2 linux 配置端口映射相应目录
如何在 apache 服务器上部署 nodejs 应用？
♥

```
<VirtualHost *:80> 
ServerName app.A.com 
ServerAlias app.A.com *.app.A.com 
ProxyPass / http://localhost:3000/ 
ProxyPassReverse / http://localhost:3000/ 
ErrorLog logs/app.A.com-error_log 
CustomLog logs/app.A.com-access_log common 
</VirtualHost>
```

https://www.v2ex.com/t/325776