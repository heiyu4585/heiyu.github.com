express链接mysql的demo


## 列表查询

```
{
	courses(limt:3) {
    id
	  score
	  course
	}
}
```
结果:
```markdown
{
  "data": {
    "courses": [
      {
        "id": 1,
        "score": 33,
        "course": "数学"
      },
      {
        "id": 2,
        "score": 55,
        "course": "语文"
      },
      {
        "id": 3,
        "score": 55,
        "course": "数学"
      }
    ]
  }
}
```

###单独查询
```$xslt
{
	course(userId:1) {
	  score
	  course
	}
}
```
结果:
```markdown
{
  "data": {
    "course": {
      "score": 33,
      "course": "数学"
    }
  }
}
```

###变更查询
```
mutation {
  addUser (name:"nk",sex:"22",intro:"sdfasdfasdf"){
  id
  }
}

```

结果:
```markdown
{
  "data": {
    "addUser": {
      "id": 26
    }
  }
}
```

### 组合查询
```markdown
{
	courses {
    id
	  score
	  course
	}
  users {
    id
    name
  }
}

```
结果
```markdown
{
  "data": {
    "courses": [
      {
        "id": 1,
        "score": 33,
        "course": "数学"
      },
      {
        "id": 2,
        "score": 55,
        "course": "语文"
      }
    ],
    "users": [
      {
        "id": 1,
        "name": "xiaoming"
      },
      {
        "id": 2,
        "name": "2"
      },
      {
        "id": 3,
        "name": "2333"
      }
    ]
  }
}
```

###用户输入类型查询

```
mutation {
  addUserByInput (userInfo:{
    name:"ddd",
    intro:"33"
  }) {
    id
  }
}
```

结果:
```markdown
{
  "data": {
    "addUserByInput": {
      "id": 27
    }
  }
}
```


# GraphQL入门到放弃

### GraphQL是什么
```
GraphQL 既是一种用于 API 的查询语言也是一个满足你数据查询的运行时。 GraphQL 对你的 API 中的数据提供了一套易于理解的完整描述，使得客户端能够准确地获得它需要的数据，而且没有任何冗余，也让 API 更容易地随着时间推移而演进，还能用于构建强大的开发者工具。
```
### 为什么要用

GraphQL对你的API中的数据提供了一套易于理解的完整描述，使得客户端能够准确地获得它需要的数据，而且没有任何冗余，也让 API 更容易地随着时间推移而演进，还能用于构建强大的开发者工具。
2. 获取多个资源只用一个请求
3. 请求你所要的数据不多不少
1. 描述所有的可能类型系统

### GraphQL怎么用


#相关文档:


[官方视频教程](https://www.howtographql.com/basics/1-graphql-is-the-better-rest/)

[GraphQL系列一快速入门教程](http://www.zhaiqianfeng.com/2017/06/learn-graphql-first-demo.html)

[GraphQL系列二 数据类型](http://www.zhaiqianfeng.com/2017/06/learn-graphql-type-system.html)

[GraphQL系列三 JavaScript实战入门](http://www.zhaiqianfeng.com/2017/06/learn-graphql-action-by-javascript.html)

该系列比较好

[GraphQL什么鬼](http://blog.kazaff.me/2016/01/01/GraphQL%E4%BB%80%E4%B9%88%E9%AC%BC/)

[Node.js 服务端实践之 GraphQL 初探](http://taobaofed.org/blog/2015/11/26/graphql-basics-server-implementation/)

[GraphQL 搭配 Koa 最佳入门实践](https://segmentfault.com/a/1190000012720317)

基本一整套的实现,但是没有数据库,没法跑通

[GraphQL初探:从REST到GraphQL，更完善的数据查询定义](https://segmentfault.com/a/1190000005766732#articleHeader9)


[GraphQL：一种不同于REST的接口风格](http://ju.outofmemory.cn/entry/290247)


可参考github:
https://github.com/zhaiqianfeng/GraphQL-Demo/tree/master/javascript/advance
https://github.com/proYang/GraphQL-demo
https://github.com/naihe138/GraphQL-demo
封装很好.比较不错
##坑

### node支持 import

下面在项目文件夹新建一个start.js，然后在里面写上以下代码：

```
require('babel-core/register')({
  'presets': [
    'stage-3',
    ["latest-node", { "target": "current" }]
  ]
})

require('babel-polyfill')
require('./server')
```
然后 在命令行，运行`npm install babel-core babel-polyfill babel-preset-latest-node babel-preset-stage-3 --save-dev`安装几个开发模块。

安装完毕之后，在命令行运行 node start.js

### mysql

1.graphQL 与mysql数据库查询的异步问题 : `async awit`