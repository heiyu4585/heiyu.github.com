# graphql

你把info字段json展开，里面可能有ast/fields/nodes等名字字段，看看里面的内容。
目前有解析的方法，关键字搜索graphql projection，但是建议你参考方法，
因为graphql内查询字段名，与你model使用的字段名之间可能不一致，也可能有转换关系，也可能你的model需要多级查询，而graphql返回结果结构上是扁平的等等。

https://github.com/GraphQL-China/graphql-redis-pubsub-demo/blob/mysql/data/projection.js
 我之前写的一个demo，入口是这儿，但是分析方法你可以想个更好的。这种太粗糙了。

https://github.com/GraphQL-China/graphql-redis-pubsub-demo/blob/mysql/data/queries/dish.js
