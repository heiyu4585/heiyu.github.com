# todolist


## 拼音按首字母排序
[只需两步快速获取微信小程序源码](https://juejin.im/post/5b0e431f51882515497d979f)

[12306车站代码（生成json文件](https://www.jianshu.com/p/fd42fde4f776)

[全国省市县数据库](https://github.com/eduosi/district)







## ssr项目

3. arthas配置中心开发  修改/构建/重启/项目管理/记录相关
5. nginx 动静分离
6. 语法分析/编译  ast

8. 完成git拉取及jinkens构建功能(为骨科pc端开启jenkisjob  (或者其他切换方式))

1. 是否考虑压测 loadtest,开发整体偏完成核心功能后,稳定性及可行性的,顾先完成主体功能后,进行压测
开发周边功能:业务线在arthas维护预取接口等


### 遇到的问题:
1. 配置文件比较死,格式化也会造成服务挂
4.  Node#moveTo was deprecated. Use Container#append.
5. 首页中调用的js和css 因为转发到8013端口,在80端口上没有,当前做法是复制过去.
4. h5多页面 会把其他的router引入,不停的跳转,暂未找到原因

### 以后需跟进的问题:
1. linux cp -r 如何复制隐藏文件
3. 会把一个第三方未引用的css,压入主css,当前方案为删除,未深入研究 
 当前认为是 vuessr做打包时,会把所有dist目录中的文件进行打包.
2. asyncData 会执行两次,当前解决方案增加环境变量,只再服务端执行,尚未找到具体原因
8. 接口出现不能访问的问题时,服务整个挂了 ,应该是未做空值处理

### 已完成
>1. nginx配置https
>2. 构建流程开发
>10. 前期以host切换环境,后期直接更改代码,否则
>1. 梳理项目整体思路   完成流程图及原型图
>1. 如何控制多个项目的修改,重启等.
   --配置命令行同步代码,如果可行,
>2. 如果在git clone 的项目中再次使用 git clone 子项目无法被add进 副项目
 - 通过node复制一份  通过先拉取项目 通过node复制时,排除.git目录实现
>1. 拉取第一个地方,然后 复制到 serverrender项目中, 避免混乱
>1. 日志保存功能
>7. barbel 报错修改
>1.VueAwesomeSwiper  报错  fastclick 报错
>4. 服务器环境配置
>1. node启用进程后,本身如何退出
 -  pm2/forever/
 - nohup npm run start & 启动，然后按任意键，如果没有出现 exit 表示启动成功，最后退出终端的时候使用 exit 断开链接，不要直接关闭终端，这点切记。
 -  解决Linux关闭终端(关闭SSH等)后运行的程序自动停止
远程通过命令行启动
> 3. ~arthas ssh连接 服务器是 调用的服务需要绝度路径,或者 执行下环境变量~~
> 1. 了解 preload 和prefethc 对于缓存的优化
> 1. alinnode 性能监控(后续需要考虑的问题:)
> 1. css. js 未压缩到单文件内,引用文件过多  切换环境变量
> 4. 刷新后出现404,应该是需要配置nginx  n
> nginx配置404和 express配置404跳转首页的区别
> 5. 如何切换nginx,修改后的代码库如何访问    修改host
> 7. git回退已经修改的文件
> 8. node执行命令时,如果有报错的情况下,git reset 命令会回退到根目录,必须得再打开一次,感觉是因为 出错后报错路径为根目录 (传入对应的参数解决)
> 9. exec 执行命令行时,总是再当前路径执行的问题,传入 执行路径参数 修复该问题
> 10. perfetch和perload问题,需要设置对应的参数,
> 10. 服务器安装 git ssh 不用每一次都输入密码  
> 11. [Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content. This is likely caused by incorrect HTML markup, for example nesting block-level elements inside <p>, or missing <tbody>. Bailing hydration and performing full client-side render. warn
>1. 检查是否entry-client.js是否替换store
> 检查客户端其他生命周期钩子是否影响到页面数据的显示，比如用到一些关于数据的v-if等等
> 在服务端渲染中，created和beforeCreate之外的生命周期钩子不可用，因此项目引用的第三方的库也不可用其它生命周期钩子，这对引用库的选
> 解决方案:
> 修改m-home中的 // created() { 为    beforeMount() {
> 1. swiper兼容方式处理及改变为ssr写法
> 1. fastclick 报错 Cannot read property 'style' of undefined when adding new tab
> fastclick兼容方式处理,因为引入了第三方的jsdom用于模拟window,document等变量,所以不能通过判断window去区别是否为浏览器环境,当前采用是否支持process对象,来区分执行环境
> 1. fundebug 初始化执行放在app.vue中
>