

[TOC]
# 面向对象的javascript
## 动态类型的语言和鸭子类型
### 动态类型的语言
1. 静态类型语言在编译时,已经确定变量的类型,
* 编译时发现类型不匹配的错误,
* 明确规定了数据类型,可以做一定优化,提高程序执行速度.
2. 动态类型语言要到程序运行时,变量被赋予某个值后,才能确定具有某种类型
* 更加简洁
* 专注逻辑表达
* 无法保证变量的类型
### 鸭子类型
由于无需进行类型检查,我们可以尝试调用任何对象的任意方法,而无需考虑它原来是否被设计为拥有该方法.

`鸭子类型` 拥有鸭子的singing方法就可以被当做鸭子.

## 多态

>同一操作作用于不同的对象上,可以产生不同的解释和不同的执行结果.
```markdown
    var makeSound = function(animal){
        if(animal instanceof Duck ){
            console.log("sdf")
        }else if(animal instanceof Chicken){
            console.log("gege")
        }
    }

    var Duck= function(){};
    var Chicken= function(){};
   console.log( makeSound(new Duck()));
   console.log( makeSound(new Chicken()));

```

### 对象的多态
```markdown

    var makeSound = function(animal){
        animal.sound()
    };
    var Duck= function(){};
    Duck.prototype.sound = function(){
        console.log("嘎嘎嘎");
    };

    var Chicken= function(){};
    Chicken.prototype.sound = function(){
        console.log("咯咯咯")
    };
    console.log( makeSound(new Duck()));
    console.log( makeSound(new Chicken()));
    var Dog= function(){};
    Dog.prototype.sound = function(){
            console.log("往往")
    };
    console.log( makeSound(new Dog()));
    
```

### 类型检查和多态
### 多态在面向对象程序设计中的作用
```markdown
    //
    var  renderMap = function(map){
        if(map.show instanceof Function){
            map.show();
        }
    }
    var googleMap ={
        show:function(){
            console.log('googleMap')
        }
    }

    var baiduMap ={
        show:function(){
            console.log('baiduMap')
        }
    };
    renderMap(googleMap);
    renderMap(baiduMap);
    var sosoMap ={
        show:function(){
            console.log('baiduMap')
        }
    };
    renderMap(sosoMap);
```

### 设计模式和多态
## 封装

```markdown
var myObeject=(function(){
    var _name="seve";
    return {
        getName:function(){
            return _name;
        }
    }
})();
console.log(myObeject.getName()); //seve
console.log(myObeject._name);//undeind
```


### 克隆的原型模式
```markdown
    var Plane = function(){
        this.blood =100;
        this.attacklevel =1;
        this.defenseleve =1;
    };
    var plane = new Plane();
    plane.blood =500;
    plane.attacklevel =10;
    plane.defenseleve = 7;

    var clonePlane = Object.create(plane);
    console.log(clonePlane); // ____proto__
    Object.create = Object.create|| function(obj){
            var F = function(){};
            F.prototype = obj;
            return new F();
        }
```

```markdown
    var obj1 = new Object();
    var obj2 = {};
    console.log(Object.getPrototypeOf(obj1) === Object.prototype);
    console.log(Object.getPrototypeOf(obj2) === Object.prototype);
```
### 原型链继承的未来
```markdown
var obj = {name:'sven'};
var A = function(){};
A.prototype=obj;
var B = function(){};
B.prototype = new A();
var b = new B();

console.log(b.name);


class Animal{
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name
    }

}

class Dog extends Animal{
    constructor(name){
        super(name)
    }
    speak(){
        return "woof";
    }
}

var dog = new Dog("scamp");
console.log(dog.getName()+' says '+dog.speak())

```


## this,call,apply
###this的指向

```
    var  MyClass = function() {
        this.name = 'sven';
    }
    var obj = new MyClass();
    alert(obj.name)
/***************显式返回一个对象,则返回该对象,不是之前的this**********************/
    var  MyClass = function() {
        this.name = 'sven';
        return {
            name:'anne'
        }
    }
    var obj = new MyClass();
    alert(obj.name);
    /*******************不是显示的话,则会指向this******************/
    var  MyClass = function() {
        this.name = 'sven';
        return 'anne';
    }
    var obj = new MyClass();
 ```
 ### Function.prototype.call 或 Function.prototype.apply 调用
 ```markdown
    var  obj1 = {
        name :'sven',
       getName:function(){
           return this.name;
       }
    }
    var obj2 ={
        name:'anne'
    }
    console.log(obj1.getName());
    console.log(obj1.getName.call(obj2));

    /****call 改变作用域****/

    var obj1 = function() {
        console.log(this.name)
    }
    var obj2 ={
        name:'anne'
    }
    obj1.call(obj2);
    //    console.log(obj1.call(obj2));
```
### 丢失的this
```markdown
   document.getElementById = (function(func){
       return function(){
           return func.apply(document,arguments);
       }
   })(document.getElementById);
   var getId =  document.getElementById;
  console.log( getId('div1'));
```
## call 和 apply
### 区别
apply接受两个参数,第一参数指定了函数体内的this对象的指向,第二个参数为一个
```markdown

var func = function(a,b,c,d){
    console.log(a,b,c);
};

func.apply(null,[1,2,4,,5,6,7,3]);  //1 2 4

var func = function(a,b){
    console.log(a);
    console.log(b);
};
func.call(null,[1,2,4,4,5,6,7,3]); //[1, 2, 4, 4, 5, 6, 7, 3]
    // b   undefined

    //传入null表示当前宿主对象
    
```
### 调用其他对象的方法
```
/*调用其他对象的方法*/
    Math.max.apply(null,[1,23,4,5,6,6,])
```
### 用途
#### 改变this指向

```markdown
    var obj1 ={
        name:"sven"
    }
    var obj2={
        name:'anne'
    };
    window.name='window'
    var getName = function(){
        console.log(this.name)
    }
    getName();
    getName.call(obj1);
    getName.call(obj2);
```

#### function.prototype.bind


```markdown

 Function.prototype.bind = function (context) {
        var  self = this;
        return function(){
            return self.apply(context,arguments)
        }
    }
    var obj={
        name:'seven',
        getName:function(){
            console.log(this)
        }
    };

    var func = function(){
        console.log(this.name)
    }.bind(obj);
    func();

```

```markdown
//有问题还需理解
Function.prototype.bind = function (context) {
        var  self = this;
        var aa =context;
        context =[].shift.call(arguments); //用于把数组的第一个元素从其中删除，并返回第一个元素的值。
     console.log(context === aa);
        args = [].slice.call(arguments);  //我们将提取从位置 6 开始的所有字符：
        return function(){
            return self.apply(context,[].concat.call(args,[].slice.call(arguments)));
        }
    }
    var obj={
        name:'seven',
        getName:function(){
            console.log(this)
        }
    };

    var func = function(a,b,c,d){
        console.log(this.name);
        console.log([a,b,c,d])
    }.bind(obj,1,2);
    func(3,4);
    func(5,6);

```
#### 借用其他对象的方法
1. 可以实现类似继承的效果

```markdown
    var A = function(name){
        this.name = name;
    }

    var B = function(){
        A.apply(this,arguments)
    }

    B.prototype.getName=function(){
        return this.name
    }
    var b = new B('sven');
    console.log(b.getName());

```
2.
```markdown
    (function(){
        Array.prototype.push.call(arguments,3);
        console.log(arguments)
    })(1,34,4)

    var a ={};
    Array.prototype.push.call(a,'first');
    
    console.log(a.length); //会顺便修改length的值
    console.log(a)  //{0: "first", length: 1}
```
#闭包和高阶函数

##闭包
### 变量的作用域
### 变量的生命周期
```markdown
    var func = function(){
        var a =1 ;
       return function(){
           a++;
           console.log(a);
       }
    };
//    func()();//  2 
//    func()();//  2 
//    func()();//  2 
//    func()();//  2 
//    func()();//  2 
//    func()(); //  2 

    var f = func();
    f(); //2
    f(); //3
    f(); //4
    f(); //5
    f();//6
    f();  // 7
```


```markdown
for(var i= 0;i< 5;i++){
  document.getElementsByTagName('div')[i].onclick = function(){
      debugger;
      console.log(i)
  }
}
for(var i= 0;i< 5;i++){
    (function(i){
        document.getElementsByTagName('div')[i].onclick = function(){
            console.log(i)
        }
    })(i)
}
```

### 更多的作用
1.封装变量
```markdown
   var mult = function(){
        var a= 1;
        for(var i=0,l=arguments.length;i<l;i++){
            a = a* arguments[i]
        }
        return a;
    }
   console.log( mult(1,4,5,6))
    /****增加缓存***/
    var cache ={};
    var mult = function(){
        var args = Array.prototype.join.call(arguments,',');
        if(cache[args]){
            return  cache[args]
        }
        var a= 1;
        console.log('sadf');
        for(var i=0,l=arguments.length;i<l;i++){
            a = a* arguments[i]
        }
        return  cache[args]= a;
    }
    console.log( mult(1,4,5,6));
    console.log( mult(1,4,5,6));
    /**封装cache对象在函数内容***/

var mult = (function(){
    var cache ={};
    return function(){
        var args = Array.prototype.join.call(arguments,',');
        if(cache[args]){
            return  cache[args]
        }
        var a= 1;
        console.log('sadf');
        for(var i=0,l=arguments.length;i<l;i++){
            a = a* arguments[i]
        }
        return  cache[args]= a;
    }
})();
console.log( mult(1,4,5,6));
console.log( mult(1,4,5,6));
/**小功能方法提取***/
var mult = (function(){
    var cache ={};
    var calculate = function(){
        var a= 1;
        for(var i=0,l=arguments.length;i<l;i++){
            a = a* arguments[i]
        }
        return a;
    }
    return function(){
        var args = Array.prototype.join.call(arguments,',');
        if(cache[args]) {
            return cache[args]
        }
        console.log('sadf');
//        return cache[args] =calculate(arguments) //要对象上面的calculate(arguments)
        return cache[args] = calculate.apply(null,arguments);
    }
})();
console.log( mult(1,4,5,6));
console.log( mult(1,4,5,6));

```
2.延续局部变量的寿命 ??? 干嘛用的

### 闭包和面向对象设计
### 用闭包实现命令模式
```markdown
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<button id="execute">点击执行命令</button>
<button id="undo">点击执行命令</button>
<script>
    var Tv = {
        open: function () {
            console.log('打开电视机')
        },
        close: function () {
            console.log('关上电视机')
        }
    };

    var openTvCommand = function (recever) {
        this.recever = recever;
    }
    openTvCommand.prototype.execute = function () {
        this.recever.open();
    }
    openTvCommand.prototype.undo = function () {
        this.recever.close();
    }

    var setCommand = function (command) {
        document.getElementById('execute').onclick = function () {
            command.execute();
        };
        document.getElementById('undo').onclick = function () {
            command.undo();
        }
    };

    setCommand(new openTvCommand(Tv))


    /****闭包模式***/
    var Tv = {
        open: function () {
            console.log('打开电视机')
        },
        close: function () {
            console.log('关上电视机')
        }
    };
    var createCommand = function (receiver) {

        var execute = function () {
            return receiver.open();
        };
        var undo = function () {
            return receiver.close();
        };
        return {
            execute: execute,
            undo: undo
        }
    };

    var setCommand = function (command) {
        document.getElementById('execute').onclick = function () {
            command.execute();
        };
        document.getElementById('undo').onclick = function () {
            command.undo();
        }
    };

    setCommand(createCommand(Tv))

</script>
</body>
</html>
```

### 闭包和内存管理
设置为null

## 高阶函数
    高阶函数是指至少满足下列条件之一的函数
    1.函数可以作为参数被传递
    2.函数可以作为返回值输出
### 函数作为参数传递
1. 回调函数
2. Array.prototype.sort
[1,9,4,6].sort(function(a,b){
    return a-b;
})
### 函数作为返回值输出
1. 判断数据的类型

```markdown
    var Type={};
    for(var i=0,type;type=['String','Array','Number'][i++];){
        (
            function(type){
                Type['is'+type] = function(obj){
                    return Object.prototype.toString.call(obj) == '[object '+type+']'
                }
            }
        )(type)
    }
  console.log(  Type.isArray([]));
  console.log(  Type.isString("str"))
```
### getSingle
```markdown
  var getSingle = function(fn){
        var ret;
        return function(){
            console.log(this);
            return ret || (ret = fn.apply(this,arguments));
        }
    };
    
    var getScript = getSingle(function(){
        return document.createElement('script');
    });
    
    var script1 = getScript();
    var script2 = getScript();
    console.log(script1 == script2);
```

### 高阶函数实现AOP
javascript中实现AOP,都是指一个函数"动态织入"到另一个函数之中.

```markdown
   Function.prototype.before = function(beforefn){
        var  _self = this;
        return function(){
            beforefn.apply(this,arguments);
            return _self.apply(this,arguments)
        }
    };

    Function.prototype.after = function(afterfn){
        var  _self = this;
        return function(){
            var ret = _self.apply(this,arguments);
            afterfn.apply(this,arguments);
            return ret;
        }
    };

    var func = function () {
        console.log(2)
    };
    func = func.before(function(){
        console.log(1)
    }).after(function(){
        console.log(3)
    });

    func();

```
#### 其他应用
1. curring
```markdown
var monthlyCost =0;
  var cost = function(money){
      monthlyCost+=money;
  };
  cost(100);
  cost(200);
  cost(300);
  console.log(monthlyCost)

    var cost =(function(){
        var args =[];
        return function(){
            if(arguments.length === 0 ){
                var money = 0;
                for(var i =0,l=args.length;i<l;i++){
                    money+=args[i]
                }
                return money;
            }else{
                [].push.apply(args,arguments)
            }
        }
    })();
  cost(100);
  cost(200);
  cost(400);
    console.log(cost());
    /****封装通用***/
    var currying= function(fn){
        var args=[];
        return function(){
            if (arguments.length ===0){
                return fn.apply(this,args)
            }else{
                [].push.apply(args,arguments);
                return arguments.callee;
            }
        }
    }

    
    var cost = (function(){
        var money = 0;
        return function(){
            for(var i =0,l=arguments.length;i<l;i++){
                money+=arguments[i];
            }
            return money;
        }
})()
    var cost = currying(cost);
    cost(100);
    cost(1200);
    cost(300);
    console.log(cost())
```
#### uncrrying
```markdown
 Function.prototype.uncurrying = function(){
      var self = this;
      return function(){
          var obj = Array.prototype.shift.call(arguments);
          return self.apply(obj,arguments);
      }
  }
  var push = Array.prototype.push.uncurrying();

  (function () {
      push(arguments,4);
      console.log(arguments);
  })(1,2,4,6)

    
    for(var i=0,fn,ary=['push','shift','forEach'];fn=ary[i++];){
      Array[fn] = Array.prototype[fn].uncurrying()
    };
  
    var obj={
        length:3,
        '0':1,
        '1':2,
        '2':3
    }
    
    Array.push(obj,4); //向对象中添加一个元素
    console.log(obj.length); //输出:4
    
    var first = Array.shift(obj);
    console.log(first);
    console.log(obj);
    
    Array.forEach(obj,function(i,n){
        console.log(n) //分别输出0,1,2
    })
    
    
```
#### 另一种实现方式

```markdown
Function.prototype.uncurrying = function(){
    var self = this;
    return function(){
        return Function.prototype.call.apply(self,arguments)
    }
}
```

#### 函数节流


```markdown
var throttle = function(fn,interval){
     var _self = fn,
         timer,
         firstTime=true;
     return function(){
         var _me = this,
             args= arguments;
         if(firstTime){
             _self.apply(_me,args);
            return firstTime = false;
         }
         if(timer){
             return false;
         }
         timer = setInterval(function () {
             clearInterval(timer);
             timer=null;
             _self.apply(_me,args)
         },interval||1000)
     }
};

window.onresize = throttle(function () {
    console.log(1)
},500)
```
#### 分时函数
```markdown

var  timerChunk = function(ary,fn,count){
    var obj,
        t;
    var len = ary.length;
    var start = function(){
        for(var i =0;i<Math.min(count|| 1,ary.length);i++){
            var obj=ary.shift();
            fn(obj);
        }
    };
    return function(){
        t = setInterval(function(){
            if(ary.length ===0){
                return clearInterval(t);
            }
            start();
        },1000)
    }
};

var  ary=[];
for(var i=1;i<1000;i++){
    ary.push(i);
}
var renderFriendList = timerChunk(ary,function(n){
    var div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);

},8);

renderFriendList(ary);
```
### 惰性加载 
判断后方法重写,只判断一次
```markdown
var addEvent = function(elem,type,handler){
    if(window.addEventListener){
        addEvent = function(elem,type,handler){
            elem.addEventListener(type,handler,false)
        }
    }else if( window.attachEvent){
        addEvent = function(elem,type,handler){
            elem.attachEvent('on'+type,handler)
        }
    }
    addEvent(elem,type,handle)
}

```
# 设计模式
#单例模式
## 实现单例模式
```markdown
var Singleton = function(name){
    this.name = name;
}
Singleton.prototype.getName = function(){
    console.log(this.name)
}

Singleton.getInstance = (
    function(){
        var instance = null;
        return function(name){
            if(!instance){
                instance = new Singleton(name)
            }
            return instance
        }
    }
)()

    var a  = Singleton.getInstance('sven1')
    var b  = Singleton.getInstance('sven2')
    console.log(b===a);
    console.log(a.name)
```
## 透明的单例模式
## 用代理实现单例模式

```markdown
var CreateDiv = function(html){
    this.html = html;
    this.init();
}

CreateDiv.prototype.init = function(){
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
}

var ProxySingletonCreateDiv =(function () {
    var instance;
    return function (html) {
        if(!instance){
            instance = new CreateDiv(html)
        }
        return instance
    }
})();

var a = new ProxySingletonCreateDiv('sevn1');
var b = new ProxySingletonCreateDiv('sevn2');
console.log(a===b)

```

## js 中的单例模式

####   使用命名空间
```markdown
    var namespace1 = {
        a: function () {
            console.log(1)
        },
        b: function () {
            console.log(2)
        }
    }

    

```
####    使用闭包封装私有变量
```markdown
    /*使用闭包封装私有变量*/
    var user = (function () {
        var _name= 'sven',
            _age=29;
        return {
            getUserInfo:function(){
                return _name+'-'+_age;
            }
        }
    })()
    
```
### 惰性单例
```markdown
var createLoginLayer = (function(){
    var div;
    return function(){
        if(!div){
            var div = document.createElement('div');
            div.innerHTML = "我是登陆窗";
            document.body.appendChild(div);
        }
        return div;
    }
})()

    document.getElementById('undo').onclick = function(){
        var loginLayer = createLoginLayer();
        loginLayer.style.display ='block';
    }

```
### 通用的惰性单例

```markdown
var getSingle = function(fn){
    var result;
    return function(){
        return result|| (result = fn.apply(this,arguments))
    }
}
var createLoginLayer = function(){
    var div = document.createElement('div');
    div.innerHTML = "我是登陆窗";
    document.body.appendChild(div);
    return div;
};

var createSingleLoginLayer = getSingle(createLoginLayer);
document.getElementById('undo').onclick = function(){
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display ='block';
}
var createSingleIframe = getSingle(function(){
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    return iframe;
});

document.getElementById('execute').onclick = function(){
    var loginLayer = createSingleIframe();
    loginLayer.src='http://www.baidu.com'
}
```

#### click事件只绑定一次(有问题)

```markdown
  var getSingle = function(fn){
        var result;
        console.log(result);

        return function(){
            return result|| (result = fn.apply(this,arguments))
        }
    }
var bindEvent = getSingle(function () {
    document.getElementById('execute').addEventListener("click",function () {
        console.log(1)
    })
});
    var render = function () {
        console.log("开始渲染");
        bindEvent();
    };

render();
render();
render();
render();
```