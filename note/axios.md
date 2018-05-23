[TOC]
# axios
## axios请求JSON问题详解

  -  当参数是JSON对象时，默认的Content-Type是application/json。
  -  
  ```
	axios.post('/user', {

    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  ```
  
此时传递的参数是Request Payload格式`{firstName:"Fred",lastName:"Flintstone"}`

```
如果出现No 'Access-Control-Allow-Origin' header is present on the requested resource的错误，则是跨域问题。本人喜欢直接配置服务器来解决跨域：例如Nginx配置：Nginx配置跨域请求
```
  2. 当参数是`JSON字符串`时，默认的Content-Type是application/x-www-form-urlencoded。

```
axios.post('/user', JSON.stringify({
    firstName: 'Fred',
    lastName: 'Flintstone'
  }))
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

```
此时传递的参数是Form Data格式`key : value：`

```
{"firstName":"Fred","lastName":"Flintstone"}:
```
如上。其实这是一个无效的数据，key为`{"firstName":"Fred","lastName":"Flintstone"}`，value为空。
  3. 要想使用application/x-www-form-urlencoded格式，需要进行数据转换，虽然有两种方式`URLSearchParams`和`qs`两种方式。我更喜欢使用`qs`库的方式，代码如下：
  
```
axios.interceptors.request.use((req) => {
    if (req.method === 'post') {
     req.data = qs.stringify(req.data);
    }
    return req;
}, (error) => Promise.reject(error));
```

之后使用axios的时候，只需要传递json对象就可以：

```
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
 
```
http://blog.csdn.net/qq_27008807/article/details/78945990

## axios请求超时,设置重新请求的完美解决方法

```
//在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);
    
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;
    
    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }
    
    // Increase the retry count
    config.__retryCount += 1;
    
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});

```
[axios请求超时,设置重新请求的完美解决方法](https://juejin.im/post/5abe0f94518825558a06bcd9)

```
/**
 * @file Axios的Vue插件（添加全局请求/响应拦截器）
 */

// https://github.com/mzabriskie/axios
import axios from 'axios'

// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'

  return config
})

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
  const data = response.data

// 根据返回的code值来做不同的处理（和后端约定）
  switch (data.code) {
    case '0':
      // 举例
      // exp: 修复iPhone 6+ 微信点击返回出现页面空白的问题
      if (isIOS()) {
        // 异步以保证数据已渲染到页面上
        setTimeout(() => {
          // 通过滚动强制浏览器进行页面重绘
          document.body.scrollTop += 1
        }, 0)
      }
      // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
      return data

    // 需要重新登录
    case 'SHIRO_E5001':
      // 微信生产环境下授权登录
      if (isWeChat() && IS_PRODUCTION) {
        axios.get(apis.common.wechat.authorizeUrl).then(({ result }) => {
          location.replace(global.decodeURIComponent(result))
        })
      } else {
        // 否则跳转到h5登录并带上跳转路由
        const search = encodeSearchParams({
          next: location.href,
        })

        location.replace(`/user/login?${search}`)
      }

      // 不显示提示消息
      data.description = ''
      break

    default:
  }
  // 若不是正确的返回code，且已经登录，就抛出错误
  const err = new Error(data.description)

  err.data = data
  err.response = response

  throw err
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
    }
  }

  return Promise.reject(err)
})

axios.install = (Vue) => {
  Vue.prototype.$axios = axios
}

export default axios
```

[axios拦截设置和错误处理](https://blog.csdn.net/sjn0503/article/details/74729300)

## 参考资料
[axios全攻略](https://ykloveyxk.github.io/2017/02/25/axios%E5%85%A8%E6%94%BB%E7%95%A5/)

[Vue-cli proxyTable 解决开发环境的跨域问题](https://www.jianshu.com/p/ee72c3d7f233?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation
)

[Vue2.0总结———vue使用过程常见的一些问题](https://www.cnblogs.com/yufann/p/Vue-Node10.html)

[[总结]vue开发常见知识点及问题资料整理（持续更新）](http://www.zhimengzhe.com/Javascriptjiaocheng/392662.html)

[官方:vueRouter](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)  










