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

## this,call,apply

