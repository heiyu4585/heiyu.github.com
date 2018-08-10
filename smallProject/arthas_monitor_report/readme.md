#说明


1. 开发环境
`npm run dev`

2. 打包构建
`npm run build`

3. 构建地址为
`/arthas_monitor_report`



### vue错误构建方式
```markdown

let  arthas_monitor_report  = require('@allin/arthas_monitor_report');
console.log(arthas_monitor_report)
function formatComponentName(vm)
{
    console.log("这里执行了!!~~")
    if (vm.$root === vm) return 'root';

    var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
    return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');

}
Vue.config.errorHandler = function (err, vm, info) {
    // handle error
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    // 只在 2.2.0+ 可用
    var componentName = formatComponentName(vm);
    var propsData = vm.$options && vm.$options.propsData;
    //程序启动
    arthas_monitor_report.init({
        token: '11',
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