#安装
To install the web server, initialize an npm project and install the http-server package.

```
npm init
npm install http-server --save-dev
```
To run the server, let’s define a simple npm script. Just add the following scripts section to package.json
```
"scripts": {
  "start": "http-server"
},
```

Installing PhantomCSS

```text
npm install phantomcss casperjs phantomjs-prebuilt --save-dev
```


```text
"test": "casperjs test test.js"
```

#执行
```
npm test
```