#rsync 免密码登陆
## (未成功|放弃)

[rsync命令](http://man.linuxde.net/rsync)

[Node.js实现客户端与服务器端文件同步](http://www.nodeclass.com/articles/69396)

[node-rsync(nodebao )](https://github.com/mattijs/node-rsync)

[rsync 通过密码文件实现远程同步](https://my.oschina.net/yyping/blog/91964) 未成功
[rsync 原生的无密码同步方法记录](http://github.tiankonguse.com/blog/2015/01/16/rsync-second.html) 未成功

```
1、从本地同步到远程
rsync -avz -e ssh /data/wwwroot/shop/upload/ root@120.24.170.210:/data/wwwroot/shop/upload 
rsync -avz -e 'ssh -p 61124' /data/wwwroot/shop/upload/ root@120.24.170.210:/data/wwwroot/shop/upload 
以上两种方式的区别就是远程的ssh默认端口换了

2、从远程同步到本地
rsync -avzP -e ssh root@114.215.191.193:/data/wwwroot/shop/upload /data/wwwroot/shop/upload/ 
rsync -avzP -e 'ssh -p 61124' root@114.215.191.193:/data/wwwroot/shop/upload /data/wwwroot/shop/upload/

```
