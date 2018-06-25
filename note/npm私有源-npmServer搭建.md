# npm私有仓库-npmServer搭建

## npm源是什么

就是下载需要依赖包的服务器地址，默认是` npm ---- https://registry.npmjs.org/`
国内的小伙伴会发现，国外的源速度太慢， 于是就会找到国内的淘宝源
`taobao - https://registry.npm.taobao.org/`

## npm私仓库-npmServer的意义

公司出于自身隐私保护需要，不想把自己的代码开源到包管理区，但是又急需一套完整包管工具，来管理越来越多的组件、模块和项目。

- 网络因素（下载速度不佳，企业内网等）
- 私有包的发布与管理
- npm包公用

## 如何选择技术栈
当前比较好的选择是`cnpm`和`sinopia`,通过对比最终选择了`cnpm`

- | cnpm | sinopia
---|---|---
系统支持 |非windows | 全系统
安装 | 复杂 | 简单
配置  |较多，适合个性化需求较多的  |较少
配置——修改默认镜像  |不支持 | 支持
存储 | mysql等 | 文件格式，直观
服务托管  |默认后台运行 | pm2, doker, forever
文档资料  |较多 | 较少



## cnpm安装(服务端)
### 下载及安装依赖

```
	$ git clone git://github.com/cnpm/cnpmjs.org.git
	$ cd ./cnpmjs.org 
   & npm install
```

注意:不要下载到alpha版本

### 配置数据库

1. 创建mysql数据库(也支持其他类型数据库,本文以mysql为列)

2. 将 doc/db.sql 导入数据库

### 根据实际情况修改cnpm配置

```
module.exports = {
    debug: false,
    enableCluster: true, // enable cluster mode
    mysqlServers: [
      {
        host: 'localhost',
        port: 3306,
        user: 'cnpmjs',
        password: 'cnpmjs123',
      }
    ],
    mysqlDatabase: 'cnpmjstest',
    redis: {
      host: 'localhost',
      port: 6379,
    },
    nfs: null, //use your own CND here
    enablePrivate: true, // enable private mode, only admin can publish, other use just can sync package from source npm
    admins: {
      admin: 'admin@cnpmjs.org',
    },
    syncModel: 'exist'
  };
```
cnpm 默认的两个访问端口是：

1) 7001是 registry 端口，对应 registryPort 配置项

2) 7002是 web 端口，对应 webPort 配置项

### 启动

开发环境 `$ npm run dev`

生产环境  `$ npm start `

查看状态 `$ npm run status`

停止服务 `$ npm run stop`

### 访问

- 查看npm整体下载情况

  http://127.0.0.1:7002/
  
- 包列表

  http://127.0.0.1:7002/privates
  
- 查看当前包信息

 - `$ npm info`
 - http://127.0.0.1/package/@allin/buttonTest
 
## 客户端配置:

### 操作流程
 
#### 发布私有包流程

- 切换源(执行一次即可)
   
   `$ npm config set registry http://127.0.0.1:7001`

- 添加用户(第一次发布包：)
  
  `$ npm adduser`
    
    输入姓名:***
    
    密码:***
    
    邮箱:*****

- 登陆 (非第一次发布包：)
    
    `$ npm login --registry http://127.0.0.1:7001 --scope=@allin`
    
    输入姓名:***
    
    密码:***
    
    邮箱:*****

- 发布私有包
    
	`$ npm publish`
    
- 下载私有包

	`$ npm install @allin/button  --save`

  也可以使用临时源下载私有包
  
	`$ npm install @allin/amed  --save --registry http://127.0.0.1:7001 --scope=@allin`

- 下载公有包(npmServer对于非私有包会转发到taobao源)

	`$ npm install vue  --save`


#### 版本号控制 

```
	*: 任意版本
	1.1.0: 指定版本
	~1.1.0: 1.1.0 <= 版本 < 1.2.0
	^1.1.0: 1.1.0 <= 版本 < 2.0.0
	latest：安装最新版本。
```

#### 更新机制

1. `业务线增加打包构建时自动更新`
2. `私有包有更新时,及时通知,手动更新`

#### 包结构规范
    
- 必须包含的文件

```
	-package.json
	-readme.md
```
##  常见问题

- 发布失败

```
	#package.json 
	"name": "@allin/amed",(此处要注意 添加@allin,allin为唯医网命名,请根据自身情况命名为其他)
```

- 设置默认发布至私有源

```
	#package.json
	"publishConfig" : { //这个配置是会在模块发布时用到的一些值的集合。如果你不想模块被默认被标记为最新的，或者默认发布到公共仓库，可以在这里配置tag或仓库地址。
	  	    "registry" : "http://127.0.0.1:7001"
	 } 
	    
```
-  npm publish  时要在命令行打开该模块的模块路径

	`$ cd allin/amed`
	
	`$ npm publish`


-  npm publish

```
    1. forbidden user hea not authorized to modify @test/core, please contact maintainers: admin: @test/core
    解决：管理员还没有将你的账号添加到maintainers 中。
    
    2.forbidden cannot modify pre-existing version: 1.0.10: @test/core
    解决：没有修改版本号就提交了
    
    3.no_perms Private mode enable, only admin can publish this module: @test/core
    解决：账号不是管理员在服务器添加的账号
```
2. 如何修改为自己的私有包增加共同管理者

`$ npm owner add XXX @allin/buttonli`

```
$ npm author add dead_horse cnpmjs.org

$ npm owner ls <package name>
$ npm owner add <user> <package name>
$ npm owner rm <user> <package name>

```

- 恢复为淘宝源

	`$ npm config set registry https://registry.npm.taobao.org`

- 恢复为默认npm源

	`$ npm config set registry https://registry.npmjs.org/`

- 如何清除已设置的npm淘宝镜像

```
	$ npm config delete registry
	$ npm config delete disturl
```
或者 

```
	$ npm config edit
```

找到淘宝那两行,删除



## 周边知识点

1. npm恢复为淘宝源
	`$ npm config set registry https://registry.npm.taobao.org`

2. npm恢复为默认npm源
	 `$ npm config set registry https://registry.npmjs.org/`

3. 推荐使用nrm切换源

## 参考


[跟我一起部署和定制 CNPM——基础部署](https://xcoder.in/2016/07/09/lets-cnpm-base-deploy/)
	
[CNPM搭建私有的NPM服务](http://blog.fens.me/nodejs-cnpm-npm/)
	
[cnpm官方文档](https://github.com/cnpm/cnpm)
	
[NPM 相关知识](https://github.com/wy-ei/notebook/issues/42)





## 以下内容不投稿

1.- 404 Not found @XXX/XX 

![npm-pack-404](http://p7b4glo0g.bkt.clouddn.com/npm-package-404.jpg)

当前问题:私有源安装安装不成功
原因:项目中存在npm私有源,安装时使用找不到唯医的私有源,使用npmserver私有源 又找不到其他的私有源

出现私有包安装404时的解决方法: 

先用临时源安装唯医npmserver私有包
`npm install @allin/wap-share  --save --registry http://192.168.1.149:7001 --scope=@allin`

在安装其余包




3. package.json配置详解:

```
//注:package 代表具体的包名
  {
	"name": "@allin/amed",(此处要注意 添加@allin)
	"version": "0.0.1",
	"author": "张三",
	"description": "第一个node.js程序",
	"keywords":["node.js","javascript"],//一个字符串数组，方便别人搜索到本模块

	"repository": {  //指定一个代码存放地址，对想要为你的项目贡献代码的人有帮助。
		"type": "git",
		"url": "http://127.0.0.1:7002/package/@allin/amed"
	},
	"license":"MIT",//你应该为你的模块制定一个协议，让用户知道他们有何权限来使用你的模块，以及使用该模块有哪些限制。
	"engines": {},//你可以指定项目运行的node版本范围，
	"bugs":{"url":"","email":""},//填写一个bug提交地址或者一个邮箱，
	"contributors":[{"name":"李四","email":"lisi@example.com"}],//和用户相关的属性: author, contributors
                                                                //"author"是一个码农， "contributors"是一个码农数组
	"scripts": { //scripts属性是一个对象，里边指定了项目的生命周期个各个环节需要执行的命令。
	},
	"dependencies": {//dependencies属性是一个对象，配置模块依赖的模块列表，key是模块名称，value是版本范围，版本范围是一个字符，
	},
	"devDependencies": {//如果有人想要下载并使用你的模块，也许他们并不希望或需要下载一些你在开发过程中使用的额外的测试或者文档框架。
                          在这种情况下，最好的方法是把这些依赖添加到devDependencies属性的对象中。
	
	},
	"publishConfig" : { //这个配置是会在模块发布时用到的一些值的集合。如果你不想模块被默认被标记为最新的，或者默认发布到公共仓库，可以在这里配置tag或仓库地址。
	    "registry" : "http://127.0.0.1:7001"
  }
}
```

4. cnpm confirg.js相关配置:

```
-  enableCluster：是否启用 cluster-worker 模式启动服务，默认false，生产环节推荐为 true;
- registryPort：API 专用的 registry 服务端口，默认 7001；
-  webPort：Web 服务端口，默认 7002；
-  bindingHost：监听绑定的 Host，默认为127.0.0.1，如果外面架了一层本地的 Nginx 反向代理或者 Apache 反向代理的话推荐不用改；
- sessionSecret：session 用的盐；
- logdir：日志目录；
-  uploadDir：临时上传文件目录；
- viewCache：视图模板缓存是否开启，默认为 false；
-  enableCompress：是否开启 gzip 压缩，默认为 false；
-  admins：管理员们，这是一个JSON Object，对应各键名为各管理员的用户名，键值为其邮箱，默认为 { fengmk2: 'fengmk2@gmail.com', admin: 'admin@cnpmjs.org', dead_horse: 'dead_horse@qq.com' }；
-  logoURL：Logo 地址，不过对于我这个已经把 CNPM 前端改得面目全非的人来说已经忽略了这个配置了；
-  adBanner：广告 Banner 的地址；
-  customReadmeFile：实际上我们看到的 cnpmjs.org 首页中间一大堆冗长的介绍是一个 Markdown 文件转化而成的，你可以设置该项来自行替换这个文件；
- customFooter：自定义页脚模板；
- npmClientName：默认为cnpm，如果你有自己开发或者 fork 的 npm 客户端的话请改成自己的 CLI 命令，这个应该会在一些页面的说明处替换成你所写的；
-  backupFilePrefix：备份目录；
-  database：数据库相关配置，为一个对象，默认如果不配置将会是一个 ~/.cnpmjs.org/data.sqlite 的 SQLite；
     - db：数据的库名；
     - username：数据库用户名；
     - -password：数据库密码；
      - dialect：数据库适配器，可选 "mysql"、"sqlite"、"postgres"、"mariadb"，默认为 "sqlite"；
      - hsot：数据库地址；
      - port：数据库端口；
      - pool：数据库连接池相关配置，为一个对象；
         - maxConnections：最大连接数，默认为 10；
         - minConnections：最小连接数，默认为 0；
          - maxIdleTime：单条链接最大空闲时间，默认为 30000 毫秒；
          - storege：仅对 SQLite 配置有效，数据库地址，默认为 ~/.cnpmjs/data.sqlite；
  - nfs：包文件系统处理对象，为一个 Node.js 对象，默认是 fs-cnpm 这个包，并且配置在 ~/.cnpmjs/nfs 目录下，也就是说默认所有同步的包都会被放在这个目录下；开发者可以使用别的一些文件系统插件（如上传到又拍云等）,又或者自己去按接口开发一个逻辑层，这些都是后话了；
  - registryHost：暂时还未试过，我猜是用于 Web 页面显示用的，默认为 r.cnpmjs.org；
  - enablePrivate：是否开启私有模式，默认为 false；
      - 如果是私有模式则只有管理员能发布包，其它人只能从源站同步包；
      - 如果是非私有模式则所有登录用户都能发布包；
 - scopes：非管理员发布包的时候只能用以 scopes 里面列举的命名空间为前缀来发布，如果没设置则无法发布，也就是说这是一个必填项，默认为[ '@cnpm', '@cnpmtest', '@cnpm-test' ]，据苏千大大解释是为了便于管理以及让公司的员工自觉按需发布；更多关于 NPM scope 的说明请参见 npm-scope；
 - privatePackages：就如该配置项的注释所述，出于历史包袱的原因，有些已经存在的私有包（可能之前是用 Git 的方式安装的）并没有以命名空间的形式来命名，而这种包本来是无法上传到 CNPM 的，这个配置项数组就是用来加这些例外白名单的，默认为一个空数组；
  - sourceNpmRegistry：更新源 NPM 的 registry 地址，默认为 https://registry.npm.taobao.org；
 - sourceNpmRegistryIsCNpm：源 registry 是否为 CNPM，默认为true，如果你使用的源是官方 NPM 源，请将其设为 false；
  - syncByInstall：如果安装包的时候发现包不存在，则尝试从更新源同步，默认为 true；
 - syncModel：更新模式（不过我觉得是个 typo），有下面几种模式可以选择，默认为 "none";
      - "none"：永不同步，只管理私有用户上传的包，其它源包会直接从源站获取；
      - "exist"：定时同步已经存在于数据库的包；
      - "all"：定时同步所有源站的包；
  - syncInterval：同步间隔，默认为 "10m" 即十分钟；
  - syncDevDependencies：是否同步每个包里面的 devDependencies 包们，默认为 false；
  - badgeSubject：包的 badge 显示的名字，默认为 cnpm；
  - userService：用户验证接口，默认为null，即无用户相关功能也就是无法有用户去上传包，该部分需要自己实现接口功能并配置，如与公司的 Gitlab 相对接，这也是后话了；
  - alwaysAuth：是否始终需要用户验证，即便是 $ cnpm install 等命令；
  - httpProxy：代理地址设置，用于你在墙内源站在墙外的情况。
```



## 遇到的问题

### 用户不能正确添加

```
  //添加用户不能使用此种方式,会出现用户不能添加的问题
   //npm adduser --registry http://192.168.1.149:7001 --scope=@allin
```

### fsevents@^1.0.0 (node_modules\chokidar\node_modules\fsevents):
     警告如下：
```
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.0.0 (node_modules\chokidar\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.0.17: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
npm WARN vue-loader-demo@1.0.0 No description
npm WARN vue-loader-demo@1.0.0 No repository field.
```
原因是因为： fsevent是mac osx系统的，在win或者Linux下使用了 所以会有警告，忽略即可。意思就是你已经安装成功了。气死我吧，我一直以为有啥问题呢

4.package.json中也可以是name和version并且添加上发布路径的配置：

```
Set "private": true in your package.json to prevent it from being published at all, or "publishConfig":{"registry":"http://my-internal-registry.local"} to force it to be published only to your internal registry.
```
https://docs.npmjs.com/misc/registry


### npm 私有包存储地址

  默认地址
```
 cd ~
 ls .cnpmjs.org/nfs
```

修改存储地址
```
npm login --registry http://my_private_repo:1234 --scope=@swx --userconfig=$HOME/.cnpmrc
```
 
[基于CNPM的本地私有库搭建](http://www.shaowenwu.cn/2016/03/27/npmsi-you-ku-ben-di-da-jian/)

[cnpm同步文件的存储位置在哪里？](https://github.com/cnpm/cnpmjs.org/issues/635)
### 如何混合使用npm的公共仓库和cnpm搭建的私有仓库

[如何混合使用npm的公共仓库和cnpm搭建的私有仓库](https://github.com/cnpm/cnpmjs.org/issues/929)

[npm 混合公共仓库和私有仓库](https://breeswish.org/blog/2016/02/16/npm-hybridize-public-and-private-repository/)

## todolist

 1. 存储方案

```
官方 NFS 插件
下面给出几个官方的 NFS 插件：

upyun-cnpm：包本体存在又拍云的插件；

fs-cnpm：包本体存在本地的插件；

sfs-client：包本体存在 SFS（Simple FIle Store）插件；

qn-cnpm：包本体存在七牛的插件；

oss-cnpm：包本体存在阿里云 OSS 的插件。

以后官方如果有一些新的插件进来，这里可能不会更新了，请自行去 [NFS Storage Wrappers](https://github.com/cnpm/cnpmjs.org/wiki/NFS-Guide#present-storage-wrappers) 获取最新的 NFS 插件们。
```

2. paas执行上传命令
3. 邮箱提示

参考:
参考:

[npm常用你应该懂的使用技巧](https://github.com/jiayisheji/blog/issues/5)

[npm使用介绍](http://blog.csdn.net/molong421/article/details/51322355)

[package.json文件dependencies中的各种版本号形式](http://blog.kankanan.com/article/package.json-65874ef6-dependencies-4e2d7684540479cd7248672c53f75f625f0f.html)

[NPM 相关知识 ](https://github.com/wy-ei/notebook/issues/42)

[NPM使用详解（上）](http://www.cnblogs.com/humin/p/4620312.html)

[NPM使用详解（下）](http://www.cnblogs.com/humin/p/4673955.html)

[cnpm官方文档](https://github.com/cnpm/cnpmjs.org/wiki/Deploy-a-private-npm-registry-in-5-minutes)

 [企业私有 npm 服务器](https://www.jianshu.com/p/659fb418c9e3)
 
[搭建企业私有registry实践(二)](https://jancechun.github.io/janceChun/2017/02/07/2017-02-07/)

[support npm owner](https://github.com/cnpm/cnpmjs.org/issues/271)

