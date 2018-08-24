## 项目说明

异常监控客户端,当前版本实现原生js错误监控(window.onerror),vue错误监控,兼容ie8,可通过npm及script标签直接引用
两种方式.

## npm 方式

#### 安装方式
`npm install @allin/arthas_monitor_report@latest  --save --registry http://192.168.1.149:7001 --scope=@allin`

#### 引入方式

`let  arthas_monitor_report  = require('@allin/arthas_monitor_report');`

### 初始化方法

```markdown
//程序启动

        /**
         * @description 配置项
         * token: '2', //必填,请根据具体站点传入siteId
         * limitTime:3000,   //相同异常日志发送最小间隔，即相同异常数据最快每3s发送一次
         *  checkImgSetIntervalTime: 10000, // 检查新增图片的间隔时间,默认10s
         *   transferSizeNum: 1024  //多大的图片算是大图标准 单位为kb 默认1兆
         */
         
  if(typeof arthas_monitor === "object")  {
      arthas_monitor.init({
          token: '2', //必填
      });
  }
```
## script方式

#### 引入方式
`<script src="http://paas.allinmd.cn/modules/arthas_monitor_report/arthas_monitor_report.js"></script>`

### 初始化方法

```markdown
  //程序启动
    /**
        * @description 配置项
        * token: '2', //必填,请根据具体站点传入siteId
        * limitTime:3000,   //相同异常日志发送最小间隔，即相同异常数据最快每3s发送一次
        *  checkImgSetIntervalTime: 10000, // 检查新增图片的间隔时间,默认10s
        *   transferSizeNum: 1024  //多大的图片算是大图标准 单位为kb 默认1兆
        */
  if(typeof arthas_monitor === "object")  {
      arthas_monitor.init({
          token: '2',
      });
  }
```

## vue错误构建方式

#### 安装方式

`npm install @allin/arthas_monitor_report@latest  --save --registry http://192.168.1.149:7001 --scope=@allin`

#### 引入方式 及初始化

```markdown


let arthas_monitor_report = require('@allin/arthas_monitor_report');

function formatComponentName(vm) {
    if (vm.$root === vm) return 'root';

    var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
    return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');

}

Vue.config.errorHandler = function (err, vm, info) {
    console.error(err) ;
    // handle error
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    // 只在 2.2.0+ 可用
    var componentName = formatComponentName(vm);
    var propsData = vm.$options && vm.$options.propsData;
      /**
        * @description 配置项
        * token: '2', //必填,请根据具体站点传入siteId
        * limitTime:3000,   //相同异常日志发送最小间隔，即相同异常数据最快每3s发送一次
        *  checkImgSetIntervalTime: 10000, // 检查新增图片的间隔时间,默认10s
        *   transferSizeNum: 1024  //多大的图片算是大图标准 单位为kb 默认1兆
        */
    arthas_monitor_report.init({
        token: '1',
    });
    arthas_monitor_report.initVueErrorHandle(err,
        {
            metaData:
                {
                    componentName: componentName,
                    propsData: JSON.stringify(propsData),
                    info: info
                }
        });
}

```