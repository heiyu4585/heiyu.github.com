# webpack相关


## 坑

### entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.


```
{
    ...
    mode: 'development'
    ...
}

```

[Webpack 4 踩坑指南](https://christinamcqueen.github.io/2018/03/08/Tool/Webpack-4-%E8%B8%A9%E5%9D%91%E6%8C%87%E5%8D%97/)

[webpack生成环境与开发环境配置](http://hedonglin.com/2017/07/02/webpack%E7%94%9F%E6%88%90%E7%8E%AF%E5%A2%83%E4%B8%8E%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/)

### 解决linux下node.js全局模块找不到的情况

安装全局的webpack包后,通过 webpack -v报错找不到该模块

在linux上配置环境变量很简单，只需要修改 /etc/profile 文件就可以了，在profile文件最后写上node模块的目录就可以了。

```
export NODE_HOME=/usr/local/node/node-v7.3.0-linux-x64/bin
export PATH=$NODE_HOME:$PATH
```
这里的NODE_HOME是我node.js的安装目录里面的bin目录，这样每次执行全局模块的命令就不需要写上完整的路径了。

ps:可能需要重启


### ERROR in static/js/vendor.xxxx.js from UglifyJs Unexpected token: punc webpack打包出错解决

指定文件中包含es6 ,未通过babel转码在build文件夹中的webpack.base.conf.js文件中，做如下修改：
将报错的文件添加resoleve下,通过babel转下码

```
{

test: /\.js$/,

loader: 'babel-loader',

include: [resolve('src'),
resolve('test'),resolve('node_modules/bootstrap-vue/lib')]

}
```

参考:https://blog.csdn.net/wild46cat/article/details/78024796



### (node:1784) DeprecationWarning: Chunk.modules is deprecated. Use Chunk.getNumberOfModules/mapModules/forEachModule/containsModule instead.

原因：webpack3.0中extract-text-webpack-plugin插件不推荐使用Chunk.modules，插件index.js文件中
解决:使用extract-text-webpack-plugin插件的时候报错,只是一个警告不影响工具使用，该问题还在修复中；


详情：<https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/529>

参考 : [webpack生成环境与开发环境配置](http://hedonglin.com/2017/07/02/webpack%E7%94%9F%E6%88%90%E7%8E%AF%E5%A2%83%E4%B8%8E%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/
)

### liunx 下通过命令行命令去执行对应的命令时,总是找不到

`写在npm scripts里才会去找node_modules里的webpack，直接命令行运行就是全局的`
直接运行 webpack -v，显示的是全局安装的版本。
局部版本运行，可以使用 npm run 脚本相关命令


#### 绑定sudo

如果之前尝试安装时设置过node和npm软链接，建议先删除：

`sudo rm -rf /usr/local/bin/node`

`sudo rm -rf /usr/local/bin/npm`

之后设置node和npm软链接，设置软链接的目的是在任意目录都可以直接使用node和npm命令：

`sudo ln -s /opt/node-v6.9.2-linux-x64/bin/node /usr/local/bin/node`

`sudo ln -s /opt/node-v6.9.2-linux-x64/bin/npm /usr/local/bin/npm`

