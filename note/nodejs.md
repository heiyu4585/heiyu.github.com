#nodejs
## 坑:
### nodejs 不支持 import
`npm install --save-dev babel-cli`
`npm install --save-dev babel-preset-es2015 babel-preset-stage-2`

启动方式

```
 "scripts": {
+   "start": "babel-node index.js --presets es2015,stage-2"
  }
 ```
with nodemon
 
 ```
  "scripts": {
-   "start": "babel-node index.js"
+   "start": "nodemon index.js --exec babel-node --presets es2015,stage-2"
  }
 ```
### unhandled promise rejection

当 Promise 的状态变为 rejection 时，我们没有正确处理，让其一直冒泡（propagation），直至被进程捕获。这个 Promise 就被称为 unhandled promise rejection。

```
Promise 的异常，有两种触发方式：

主动调用 reject 方法
抛出异常（exception）
// reject
new Promise((resolve, reject) => {
  reject('timeout');
});

// exception
new Promise((resolve, reject) => {
  undefinedVariable();
});
我们有两种方式去处理 rejection，方式二 是 方式一 的语法糖。

// 方式一 .then(undefined, () => {})
new Promise((resolve, reject) => {
  // ...
  reject('timeout');
}).then(undefined, (error) => {
  console.error(error);
});

// 方式二 .catch(() => {})
new Promise((resolve, reject) => {
  // ...
  reject('timeout')
}).catch((error) => {
  console.error(error);
})
```

[unhandled promise rejection](http://www.liyaoli.com/2017-06-26/unhandled-promise-rejection.html)