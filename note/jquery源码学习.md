# jquery源码学习


基于2.0.3 jquery
把jquery源码做注释
;(function(){
- (21,94)定义了一些变量和函数 jquery= function(){}
* (96,283)给JQ对象,添加一些方法和属性
* (285,347)extend:JQ的继承方法
* (349,817) jQuery.extend():扩展工具方法
* (877,2856) Sizzle:复杂选择器的实现
* (2880,3042) Callbacks : 回调对象,对函数的一个统一管理
*  (3043,3183) Deferred : 延迟对象:对异步的统一管理
*  (3184,3295) support:功能检测
*  (3653,3797) queue()  队列管理
*  (3308,3652)  data():数据缓存
*  (3803,4299) attr(),prop(),val(),addClass():对元素属性的操作.
*    (4300,5128)  on() trigger();
*  (5140,6057)DOM操作:添加,删除,获取,包装 DOM筛选
*  (6058,6620) css() : 样式操作
*  (7855,8584) animate():运动方法
*  (8585,8792) offset():位置和尺寸的方法
*  (8804,8821) JQ模块化支持
* (8826) window.jQuery = window.$=jQuery;
* })()


```
$("") ,$(null), $(undefined),$(false)
$("#div1"), $(".box"),$("div")  $("#div1 div.box")
$('li')   $('<li>1</li><li>2</li>')
$(this)  $(document)
$(function(){})
$([])  $({})

    */

    
    $(function(){
//        console.log($("li").css("background","red"));
        $('li')[1].style.background='red';
    });

//    this={
//        0:"li",
//        1:"li",
//        2:"li",
//        length:3
//    }
```


```
看完第九集半
http://jquery.miaov.com/
```


```
function jQuery(){
    return new jQuery.prototype.init();
}
jQuery.prototype.init =function(){
console.log("init")
};
jQuery.prototype.css = function(){
console.log("css")
};
jQuery.prototype.init.prototype = jQuery.prototype;
jQuery().css();

```


```markdown
            try {
                if ( obj.constructor &&
                    !core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
                    return false;
                }
            } catch ( e ) {
                return false;
            }
```
```markdown
  function aa(){
    }
  //  aa.prototype.constructor = aa; //js语言会自动创建
  //  aa.prototype.constructor = Array; //可以修改

    aa.prototype.name='hello';
    aa.prototype.age=30;
    let a1 = new aa();
    console.log(a1.constructor); //function aa(){}

    aa.prototype={
        name:'hello',
        age:30
    };
    let a2 = new aa();
    console.log(a2.constructor); //function Object() { [native code] }

    aa.prototype={
        constructor:aa, //添加这句修正为function aa(){}
        name:'hello',
        age:30
    };
    let a3 = new aa();
    console.log(a3.constructor); //function Object() { [native code] }

/* 如何实现的*/
   $("li").css({'background':"red"});
    var aLi=  document.getElementsByTagName('li'); //aLi 对象没法
    for(var i =0;i<aLi.length;i++){
        aLi[i].style.background ='red';
    }

    this={
        0:'<li>',
        1:"<li>",
        length:2
    }
    
```













# 资料
* [【深入浅出jQuery】源码浅析--整体架构](http://www.cnblogs.com/coco1s/p/5261646.html)
* [jQuery1.6.1源码分析系列（停止更新）](http://www.cnblogs.com/nuysoft/archive/2011/11/14/2248023.html)
* [jQuery源码分析系列](http://www.cnblogs.com/aaronjs/p/3279314.html)



