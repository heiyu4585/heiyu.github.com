# babel

```
{
  "presets": [
    ["env", {
      "modules": false
    }],
    "stage-2"
  ],
  // 下面指的是在生成的文件中，不产生注释
  "comments": false,
  "plugins": ["transform-runtime","syntax-dynamic-import"],
  "env": {
    // test 是提前设置的环境变量，如果没有设置BABEL_ENV则使用NODE_ENV，如果都没有设置默认就是development
    "test": {
      "presets": ["env", "stage-2"],
      // instanbul是一个用来测试转码后代码的工具
      "plugins": ["istanbul"]
    }
  }
}
```


### babel.transform(code: string, options?: Object)

将传入的 code 进行转换。返回值为一个对象，参数分别为生成的代码，source map 以及 AST 。

```
var result = babel.transform("code();", options);
result.code;
result.map;
result.ast;
```


### babel.transformFile(filename: string, options?: Object, callback: Function)
异步转译文件中的全部内容。

```
babel.transformFile("filename.js", options, function (err, result) {
  result; // => { code, map, ast }
});
```

### babel.transformFileSync(filename: string, options?: Object)
babel.transformFile 的同步版本。返回值为 filename 文件中转译后的代码。
```
babel.transformFileSync(filename, options) // => { code, map, ast }
```
示例
```
babel.transformFileSync("filename.js", options).code;

```
### babel.transformFromAst(ast: Object, code?: string, options?: Object)
给定一个 AST ，将它进行转换。
```
const code = "if (true) return;";
const ast = babylon.parse(code, { allowReturnOutsideFunction: true });
const { code, map, ast } = babel.transformFromAst(ast, code, options);
```

[options](https://www.babeljs.cn/docs/usage/api/)

### 坑
1. transform-runtime /babel-polyfill的区别

与 babel-polyfill 一样，babel-runtime 的作用也是模拟 ES2015 环境。只不过，babel-polyfill 是针对全局环境的，引入它，我们的浏览器就好像具备了规范里定义的完整的特性 – 虽然原生并未实现。
babel-runtime 更像是分散的 polyfill 模块，我们可以在自己的模块里单独引入，比如 require(‘babel-runtime/core-js/promise’) ，它们不会在全局环境添加未实现的方法，只是，这样手动引用每个 polyfill 会非常低效。我们借助 Runtime transform 插件来自动化处理这一切。

##### 安装方法
通过安装 babel-plugin-transform-runtime 和 babel-runtime 来开始。

`$ npm install --save-dev babel-plugin-transform-runtime`
`$ npm install --save babel-runtime`
然后更新 .babelrc：
```
    {
    "plugins": [
      "transform-runtime",
      "transform-es2015-classes"
    ]
  }
```

[Babel的使用](https://segmentfault.com/a/1190000008159877)

[transform-runtime 会自动应用 polyfill，即便没有使用 babel-polyfill](https://github.com/lmk123/blog/issues/45)


参考:

[官方文档](https://www.babeljs.cn/docs/usage/api/)

[一个项目中多个目录中.babelrc共存](http://imweb.io/topic/595bcf77d6ca6b4f0ac71f16)

[babel之配置文件.babelrc入门详解](https://juejin.im/post/5a79adeef265da4e93116430)