# redis
## 有什么优势
###    与mysql对比
###    与mongod对比
## 如何用
### 安装
1. 执行 brew install redis
2. 启动 redis，可以使用后台服务启动 `brew services start redis`。
或者直接启动：`redis-server /usr/local/etc/redis.conf`
3.  查看redis服务是否启动
`ps aux | grep redis`

### mac下使用redis服务

1. 通过redis-cli命令可以启动redis客户端
    `redis-cli`

2. 常用命令

        keys * 查看所有键值
        set (key) (value) 设置键key的值为value
        append (key) (value2) 在键key的值后面加上value2
        get (key) 查看键key的值

3.如何设置和查看缓存时间

    set a 123;//设置缓存：a=>123
    EXPIRE a 3600;//设置缓存时间（秒）
    TTL a；//查看缓存剩余时间

4. 如何清空所有缓存

    flushall //执行该命令后会清空redis服务器的所有缓存，一般用于应急处理，不应该作为常用命令

5. 退出redis服务

        （1）客户端退出
        执行 `redis-cli shutdown`
        （2）关闭pid
        先运行

        ps -u jim(替换成你的用户名) -o pid,rss,command | grep redis-server
        查看所有redis服务的pid号

6. 还可以通过mac自带的活动监视器查看pid

        通过Spotlight或alfred搜索activity monitor打开活动监视器
        在活动监视器中搜索redis-server，即可得到pid号
    [mac下安装配置redis](https://www.jianshu.com/p/af33284aa57a)

## 注意事项
## 遇到的问题