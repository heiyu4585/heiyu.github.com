# XMLHttpRequest

##  ie8跨域原生ajax post问题

### 方案一   jquery+juqery插件 (尝试后未成功) 


```
   <script src="http://code.jquery.com/jquery-1.5.2.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-ajaxtransport-xdomainrequest/1.0.2/jquery.xdomainrequest.min.js"></script>

// POST
$.ajax({
  url: 'http://frozen-woodland-5503.herokuapp.com/cors.json',
  data: 'this is data being posted to the server',
  contentType: 'text/plain',
  type: 'POST',
  dataType: 'json'
}).done(function(data) {
  console.log(data.name.last);
});
```


[Cross-Domain AJAX for IE8 and IE9](https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest)

[IE8、IE9不支持CORS跨域该如何解决？](https://segmentfault.com/a/1190000014871352)

#### 方案二 formData方式 
```
    function send_request(){
        var xmlhttp = null;
        if (window.XMLHttpRequest){
            xmlhttp=new XMLHttpRequest();
        }else if (window.ActiveXObject){
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xmlhttp!=null){
            var requrl = 'http://10.0.1.128:7001/ams/catch';//url可以是相对路径也可以是绝对
            xmlhttp.open( "POST",requrl,true);//第一个参数指明访问方式，第二次参数是目标url，第三个参数是“是否异步”，true表示异步，false表示同步
            xmlhttp.onreadystatechange=function(){//异步需要指定回调函数
                if (xmlhttp.readyState==4 && xmlhttp.status==200){//readyState为4，表示ajax请求已经完成，status是目标url返回的http状态码，200表示服务器响应成功
                    typeof fn === "function" && fn.call(this, xhr.responseText && JSON.parse(xhr.responseText));

                    // 处理返回结果
                }
            }
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded"); //post需要设置Content-type，防止乱码
            xmlhttp.send("username=zhangsan&age=10");//post需要将参数放在send方法，当然参数放在url也还是可以的，但不好
        }else{
            alert("您的浏览器不支持AJAX！");
        }
    };

    send_request();
```

### 方案三

```
crossDomainAjax('http://www.somecrossdomaincall.com/?blah=123', function (data) {
    // success logic
});

function crossDomainAjax (url, successCallback) {

    // IE8 & 9 only Cross domain JSON GET request
    if ('XDomainRequest' in window && window.XDomainRequest !== null) {

        var xdr = new XDomainRequest(); // Use Microsoft XDR
        xdr.open('get', url);
        xdr.onload = function () {
            var dom  = new ActiveXObject('Microsoft.XMLDOM'),
                JSON = $.parseJSON(xdr.responseText);

            dom.async = false;

            if (JSON == null || typeof (JSON) == 'undefined') {
                JSON = $.parseJSON(data.firstChild.textContent);
            }

            successCallback(JSON); // internal function
        };

        xdr.onerror = function() {
            _result = false;  
        };

        xdr.send();
    } 

    // IE7 and lower can't do cross domain
    else if (navigator.userAgent.indexOf('MSIE') != -1 &&
             parseInt(navigator.userAgent.match(/MSIE ([\d.]+)/)[1], 10) < 8) {
       return false;
    }    

    // Do normal jQuery AJAX for everything else          
    else {
        $.ajax({
            url: url,
            cache: false,
            dataType: 'json',
            type: 'GET',
            async: false, // must be set to false
            success: function (data, success) {
                successCallback(data);
            }
        });
    }
}
```
### 最终方案

1.ie8/9为了数据接口一直,采用get方法跨域.要注意数据结构中,尽量不要有对象中包含子对象

```
            function postData(data, url, fn) {
                debugLog("send Data------")
                debugLog(data);

                // IE8 & 9 only Cross domain JSON GET request
                if ('XDomainRequest' in window && window.XDomainRequest !== null) {
                    var xdr = new XDomainRequest(); // Use Microsoft XDR
                    xdr.open('get', url+'?' + toQueryString(data));
                    xdr.onload = function () {
                        typeof fn === "function" && fn.call(this, xdr.responseText);
                    };

                    xdr.onerror = function() {
                        console.log("ajaxError")
                    };

                    xdr.send();
                }else{
                    var postData = JSON.stringify(data);
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");  // 添加http头，发送信息至服务器时内容编码类型
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {  // 304未修改
                            typeof fn === "function" && fn.call(this, xhr.responseText);
                        }
                    };
                    xhr.send(postData);
                }
            }

            //对象转换为URL查询参数
            function toQueryPair(key, value) {
                if (typeof value === 'undefined') return key;
                return key + '=' + encodeURIComponent(value === null ? '' : String(value));
            }

            //对象转换为URL查询参数
            function toQueryString(obj) {
                var ret = [];
                for (var key in obj) {
                    key = encodeURIComponent(key);
                    var values = obj[key];
                    if (values && values.constructor == Array) {   //数组
                        var queryValues = [];
                        for (var i = 0, len = values.length, value; i < len; i++) {
                            value = values[i];
                            queryValues.push(toQueryPair(key, value));
                        }
                        ret = ret.concat(queryValues);
                    } else { //字符串
                        ret.push(toQueryPair(key, values));
                    }
                }
                return ret.join('&');
            }
```

[jq如何实现ie 8 下跨域的？用原生该怎么写呢？](https://segmentfault.com/q/1010000010371623)

[跨域](https://stackoverflow.com/questions/3362474/jquery-ajax-fails-in-ie-on-cross-domain-calls#11267937)(很不错)

[CSSPod—AJAX 及其跨域实现](https://csspod.com/ajax-and-cors/)(看起来很好,但是没起作用)

#### 原生格式化方式(考虑兼容性)
```
var _Url = 'http://baidu.com/login';
var _Data = {user:'xiaomi',password:'123456'};
    
if (window.XDomainRequest) _Url = _Url + '?' + toQueryString(_Data); 
$.ajax({
     url: _Url,
     data: _Data,
     type: _Method,
     dataType: 'json'
     }).done(function (oResult) {
          console.log(oResult)
     })
     
//对象转换为URL查询参数
function toQueryPair(key, value) {
    if (typeof value === 'undefined') return key;
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
}

//对象转换为URL查询参数
function toQueryString(obj) {
    var ret = [];
    for (var key in obj) {
        key = encodeURIComponent(key);
        var values = obj[key];
        if (values && values.constructor == Array) {   //数组
            var queryValues = [];
            for (var i = 0, len = values.length, value; i < len; i++) {
                value = values[i];
                queryValues.push(toQueryPair(key, value));
            }
            ret = ret.concat(queryValues);
        } else { //字符串
            ret.push(toQueryPair(key, values));
        }
    }
    return ret.join('&');
}
```
### 格式化方式(不考虑兼容性)
```
<head>

</head>

<body>
<script>
let obj = {

    a:'aaa',
    b:'bbbb',
    c:{
            c1:'c1c1c1',
            c2:'c2c2c2',
            c3:{
            c3a:'c3ac3a',
            c3b:'c3bc3b'
            }
    },
    d:'ddd',
}

function encodeUrl(obj){

let url ='';
(function (obj){

    let kvArr = Object.entries(obj);
    kvArr.forEach(v=>{
            if(Object.prototype.toString.call(v[1]) =='[object Object]')
{

                    arguments.callee(v[1]);
            }else{
                    url += v.join('=')+'&'
            }
    })
    
})(obj)
return url.substring(0,url.length-1);
}

let res =encodeUrl(obj);
console.log(res);
</script>
</body>
```

##  ActiveXObject 

`IE 中可以使用 ActiveXObject 创建 Automation 对象，同时该对象得方法及属性名称大小写不敏感。其他浏览器均不支持此技术。为了最好的兼容性，应尽量避免使用这种技术`

[BT9021: IE 中可以使用 ActiveXObject 创建 Automation 对象，同时该对象的方法及属性名称大小写不敏感](http://www.w3help.org/zh-cn/causes/BT9021)

## Form Data vs Request Payload区别

前端开发中经常会用到AJAX发送异步请求，对于POST类型的请求会附带请求数据。而常用的两种传参方式为：Form Data 和 Request Payload。

### GET请求

使用get请求时，参数会以key=value的形式拼接在请求的url后面。例如：

http://m.baidu.com/address/getlist.html?limit=50&offset=0&t=1502345139870
但是受限于请求URL的长度限制，一般参数较少时会使用get请求。


### POST请求

当参数数量较多，且对数据有一定安全性要求时，会考虑用post请求传递参数数据。POST请求的参数数据是在请求体中。

方式一： Form Data形式

当POST请求的请求头里设置Content-Type: application/x-www-form-urlencoded(默认), 参数在请求体以标准的Form Data的形式提交，以&符号拼接，参数格式为key=value&key=value&key=value...


前端代码设置：

xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhr.send('a=1&b=2&c=3');
在servlet中，后端可以通过request.getParameter(name)的形式来获取表单参数。


### 方式二：Request Payload形式

如果使用AJAX原生POST请求,请求头里设置Content-Type:application/json，请求的参数会显示在Request Payload中，参数格式为JSON格式：{"key":"value","key":"value"...}，这种方式可读性会更好。


后端可以使用getRequestPayload方法来获取。


### Form Data 和 Request Payload 区别

如果请求头里设置Content-Type: application/x-www-form-urlencoded，那么这个请求被认为是表单请求，参数出现在Form Data里，格式为key=value&key=value&key=value...

原生的AJAX请求头里设置Content-Type:application/json，或者使用默认的请求头Content-Type:text/plain;参数会显示在Request payload块里提交。

 

参考文档：

http://www.cnblogs.com/btgyoyo/p/6141480.html

http://xiaobaoqiu.github.io/blog/2014/09/04/form-data-vs-request-payload/

### 相同接口不同的写法
#### Request Payload

```
/*ajax中post方法*/
function postData(data,url, fn) {         // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    debugLog("当前发送的数据------")
    debugLog(data)
    debugLog("当前发送的数据------")
    var url = url || config.reportPath;
    // var postData = (function (obj) { // 转成post需要的字符串.
    //     var str = "";
    //     for (var prop in obj) {
    //         str += prop + "=" + obj[prop] + "&"
    //     }
    //     return str;
    // })(data);

    var postData = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");  // 添加http头，发送信息至服务器时内容编码类型
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {  // 304未修改
            typeof fn === "function" && fn.call(this, xhr.responseText && JSON.parse(xhr.responseText));
        }
    };
    xhr.send(postData);
}
```
#### Form Data

```
/*ajax中post方法*/
function postData(data,url, fn) {         // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    debugLog("当前发送的数据------")
    debugLog(data)
    debugLog("当前发送的数据------")
    var url = url || config.reportPath;
    var postData = (function (obj) { // 转成post需要的字符串.
        var str = "";
        for (var prop in obj) {
            str += prop + "=" + obj[prop] + "&"
        }
        return str;
    })(data);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  // 添加http头，发送信息至服务器时内容编码类型
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {  // 304未修改
            typeof fn === "function" && fn.call(this, xhr.responseText && JSON.parse(xhr.responseText));
        }
    };
    xhr.send(postData);
}

```
## 坑


### Request header field Content-Type is not allowed by Access-Control-Allow-Headers跨域

解决方案：

例如php服务端程序设置头：

```
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT,DELETE')
```


 但是，却发现另外一个问题。每次我发送一次请求，请求会执行两次。
 
 根据网上资料显示，OPTIONS请求可以说是一个“预请求”，用于探测发起请求的一方是否可以访问服务器，这就是跨域问题的表现之一。感觉前后端都已经解决跨域了，还是没解决这个问题。后来到stackoverflow找答案，终于找到了解决的办法。就是把header的'Content-Type'的值改为

` headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');`

   根据stackoverflow的答案的说法是：Angular发起请求的header的'Content-Type'的值默认为'application/json'，每次发送请求，会尝试先发送一次OPTIONS请求，所以我们要重写Content-Type的值。

      stackoverflow 问题的链接:https://stackoverflow.com/questions/25727306/request-header-field-access-control-allow-headers-is-not-allowed-by-access-contr
      
## jquery ajax 请求中多出现一次OPTIONS请求及其解决办法

根本原因就是，W3C规范这样要求了！在跨域请求中，分为简单请求（get和部分post，post时content-type属于application/x-www-form-urlencoded，multipart/form-data，text/plain中的一种）和复杂请求。而复杂请求发出之前，就会出现一次options请求。

什么是options请求呢？它是一种探测性的请求，通过这个方法，客户端可以在采取具体资源请求之前，决定对该资源采取何种必要措施，或者了解服务器的性能。

在ajax中出现options请求，也是一种提前探测的情况，ajax跨域请求时，如果请求的是json，就属于复杂请求，因此需要提前发出一次options请求，用以检查请求是否是可靠安全的，如果options获得的回应是拒绝性质的，比如404\403\500等http状态，就会停止post、put等请求的发出。

虽然在下面的参考文献中有人提出可以取消options请求，但是实测后发现是不行的，jquery封装之后，更不能轻易取消。因此，靠javascript客户端取消options请求是不可能的，只能通过服务端对options请求做出正确的回应，这样才能保证options请求之后，post、put等请求可以被发出。但是，我们不能允许所有的options请求，而应该是有条件的，所以最好是通过一个特殊的机制，去验证客户端发出的options请求数据是否是符合服务端的条件的，如果不满足，返回403，则客户端会取消原有的post计划。



## 跨域：The 'Access-Control-Allow-Origin' header contains multiple values '*, *', but only one is allowed

使用Ajax跨域请求资源，Nginx作为代理，出现：The 'Access-Control-Allow-Origin' header contains multiple values '*, *', but only one is allowed 错误。

服务端允许跨域配置：

```
            #region 设置允许跨域，允许复杂请求
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");
                //HttpContext.Current.Response.AddHeader("Access-Control-Max-Age", "1728000");
                HttpContext.Current.Response.End();
            }
            #endregion
            
```
Nginx的配置：

	add_header 'Access-Control-Allow-Origin' '*';
        location / {
			if ($request_method = 'OPTIONS') {
			add_header Access-Control-Allow-Origin *;
				add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,PATCH,OPTIONS;
				return 200;
			}
			proxy_pass http://xx:8002/;
			#proxy_pass http://localhost:62249/;
        }
看上面错误提示，contains multiple values "*" 意思就是设置了2次跨域，但是只有一个是允许的，移除其中的任意一个就好了。如果服务器设置了允许跨域，使用Nginx代理里面就不需要了（或者就不用使用Nginx了）

[跨域：The 'Access-Control-Allow-Origin' header contains multiple values '*, *', but only one is allowed](https://blog.csdn.net/q646926099/article/details/79082204)


## nginx 代理 options 不能正常返回数据

```
         add_header Access-Control-Allow-Origin *;
         add_header Access-Control-Allow-Headers X-Requested-With,Content-Type;
         add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
  
           location ~ ^/ams/ {
                  if ($request_method = 'OPTIONS') {
                          return 204;
                     }
                proxy_pass http://arthasMonitor;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          }
```
