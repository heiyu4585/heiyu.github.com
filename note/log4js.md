#log4js
```
/testLog4.js

var log4js = require('log4js');
log4js.configure({
    appenders: { cheese: {
            type: 'DateFile',
            filename: 'log/cheese' ,
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            category: 'access'
        } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
var logger = log4js.getLogger('example');

logger.level = 'debug';
```

  logger.debug("Time:", new Date());
  
  [Node.js 之 log4js 完全讲解](https://zhuanlan.zhihu.com/p/22110802)
  [github](https://github.com/log4js-node/log4js-node)