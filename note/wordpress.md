# wordpress

### WordPress更新时，老是提示无法连接到FTP服务器，怎么解决？

在 WordPress 目录下找到 wp-config.php 文件并编辑，在最后一行加上
`define('FS_METHOD', "direct");`


### Wordpress安装主题、插件，提示：无法创建目录，如何解决？在线等，有点急。
```
chmod -R 777 /var/www/html/
升级完成
chmod -R 644 /var/www/html/
```