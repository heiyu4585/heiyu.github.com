//test.js
const name = 'shenfq';
module.exports = () => {
    const json = {name};
    return json;
};
//main.js
require('babel-register');
var test = require('./config.js');  //test.js中的es6语法将被转译成es5

console.log(test.toString());


//原生ajax post方法
function send_request(data){
    var xmlhttp = null;
    if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }else if (window.ActiveXObject){
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp!=null){
        var requrl = 'user/save.do';//url可以是相对路径也可以是绝对
        xmlhttp.open( "POST",requrl,true);//第一个参数指明访问方式，第二次参数是目标url，第三个参数是“是否异步”，true表示异步，false表示同步
        xmlhttp.onreadystatechange=function(){//异步需要指定回调函数
            if (xmlhttp.readyState===4 && xmlhttp.status===200){//readyState为4，表示ajax请求已经完成，status是目标url返回的http状态码，200表示服务器响应成功
                var d= xmlhttp.responseText;
                // 处理返回结果
            }
        }
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded"); //post需要设置Content-type，防止乱码
        xmlhttp.send("username=zhangsan&age=10");//post需要将参数放在send方法，当然参数放在url也还是可以的，但不好
    }else{
        alert("您的浏览器不支持AJAX！");
    }
};