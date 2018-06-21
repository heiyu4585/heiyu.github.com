#读书笔记-rxjs

## 栗子
```
var button = document.querySelector('button');
Rx.Observable.fromEvent(button,'click')
    .subscribe(()=>console.log("clicked"))
```
## 纯净性
```
var count =0;
var button = document.querySelector('button');
button.addEventListener('click',()=>console.log(`clicked ${++count}`))
 //rxjs 将状态隔离出来
Rx.Observable.fromEvent(button,'click')
    .scan(count=>count+1,0) //scan与reduce类似,需要暴露给回调函数当参数的初始值.每次回调函数运行的返回值是下次
                            //回调函数运行时的参数
    .subscribe(count=>console.log(`clicked ${count} times`));
```       
## 流动性
```
    var button= document.querySelector("button");
    // var count=0;
    // var rate =3000;
    // var lastClick = Date.now()- rate;
    // button.addEventListener('click',()=>{
    //     if(Date.now()-lastClick>=rate){
    //         console.log(`click ${++count} times`)
    //         lastClick=Date.now();
    //
    //     }
    // })

    //
    Rx.Observable.fromEvent(button,'click')
        .throttleTime(1000) //其他的流程操作符
                            //filter 通过只发送Observable中满足指定predicate函数的项来进行过滤
                            //delay   每个数据项发出时间都往后推移固定的毫秒数
                            //debounceTime 只有在特定的一端时间经过后并且没有发送另一个源值,
                            // 才从源Observable中发出一个值,类似delay,但是只通过每次大量发送中的最新值
                            //take  返回的Observable 只发出源Observable 最初发出的N个值(N=count).如果源发出值得数量小于count的话,那么它的
                            // 所有值豆浆发出,然后它便完成,无论Observable是否完成.
        //takeUntil 发出源Observable发出的值,直到 notifier Observable 发出值
        //它发出源 Observable的值,然后知道第二个Observable(即 notifier)发出项,它便完成.
        //distinct //返回Observable,它发出源Observable所发出的所有与之前的项都不项目的项
        //distinctUntilChanged 返回Observable,它发出源Observable发出的所有与前一项不相同的项.


        .scan(count=>count+1,0)
        .subscribe(count=>console.log(`clicked ${count} times`));
```

## 值
对于流经observables的值,你可以对其进行转换

```
    var count =0;
    var rate =100;
    var lastClick = Date.now()- rate;
    var button = document.querySelector('button');
    button.addEventListener('click',(event)=>{
        if(Date.now()-lastClick){
            count += event.clientX;
            console.log(count);
            lastClick = Date.now();
        }
    })
    //使用rxjs
    var  button = document.querySelector('button');
    Rx.Observable.fromEvent(button,'click')
        .throttleTime(1000)
        .map(event=>event.clientX)
        .scan((count,clientX)=>count+clientX,0)
        .subscribe(count=>console.log(count));
    //pluck   将每个源值(对象)映射成它指定的嵌套属性  //类似于map 但仅用于选择每个发出对象的每个嵌套属性
    //pairwise  将当前值和前一个值作为数组放在一起,然后将其发出
    //sample   就像 sampleTime 但是无论何时 notifier Observable 进行了发送都会取样
```

## Observable  可观察对象
```
var observable = Rx.Observable.create(function(observer){
    observer.next(1);
    observer.next(2);
    observer.next(3);
    setTimeout(()=>{
        observer.next(4);
        observer.complete();
    },1000)
})


    console.log("just before  subscribe");
observable.subscribe({
    next:x=>console.log('got value'+ x),
    error:err=>console.error('something wrong occurred' + err),
    complete:()=>console.log('done'),
});
console.log('just after subscribe')
```
## 拉取和推送
- function:惰性的评估,调用时会同步地返回一个单一值
- generator 惰性的评估,调用时会同步地返回零到(有可能的)无限多个值
- promise 是最终可能(或可能不)返回单个值得运算
- Obervable 是惰性的评估运算,它可以从它被调用的时刻起同步或异步地返回零到(有可能的)无限多个值

## Observables 作为函数的泛化
Observables像是没有参数,但可以返回为多个值得函数

### 同步
```
    function foo(){
        console.log('hello');
       return 42;
   }
   
    console.log('before')
   var x= foo.call();
    console.log(x);
    console.log('after')
    var y =foo.call();
    console.log(y);

    var foo = Rx.Observable.create(function(observer){
        console.log('hello');
        observer.next(42);
    })
   console.log('before');
    foo.subscribe(function(x){
        console.log(x)
    })
   console.log('after');
    foo.subscribe(function(y){
        console.log(y)
    })
```

### 区别
```
var foo = Rx.Observable.create(function(observer){
    console.log('hello');
    observer.next(42);
    observer.next(100);
    observer.next(444);//可以返回多个值
    setTimeout(()=>{  //异步获取的数据
        observer.next("异步获取的数据")
    },3000)
})
console.log('before');
foo.subscribe(function(x){
    console.log(x)
})
console.log('after');
foo.subscribe(function(y){
    console.log(y)
})
```
### 结论
    - func.call() 意思是 '同步的给我一个值'
    - observable.subscribe() 意思是'给我任意数量的值,无论是同步还是异步'
## Observable剖析
核心关注点
- 创建 Observables
- 订阅 Observables
- 执行 Observables
- 清理 Observables
## 创建 Observables
Observables 可以使用create 来创建,但通常我们使用所谓的创建操作符,像of ,from, interval,等等.

```
    var observable = Rx.Observable.create(function subscribe(observer){
        var id = setInterval(()=>{
            observer.next('hi')
        },1000)
    });
```

## 订阅Observables
`observable.subscribe 和 Observerable.create(function subscribe(observer){...}`中的subscribe 有这同样的名字,你可以认为在概念上他们是等同的.

表明 `subscribe`调用在同一Observable的多个观察者之间是不共享的,当使用一个观察者调用`observable.subscribe`时,Observable.create(function subscribe(observer){...}) 中的 subscribe函数只服务于给定的观察者.对`Observable.subscribe`的每次调用都会触发针对给定观察者的独立设置.
`observable.subscribe(x=>console.log(x))`

## 执行Observables
` Observerable.create(function subscribe(observer){...}`中的 ... 的代码表示Observable执行,他是惰性的,只有每个观察者订阅后才会执行.

```
var observable= Rx.Observable.create(function subscribe(observer){
   try{
       observer.next(1);
       observer.next(2);
       observer.next(3);
       observer.complete();
       observer.next(4); //不会发送
   }catch(err){
       observer.error(err);//捕获到异常则发送一个错误
   }
})
observable.subscribe(x=>console.log(x))
```


## 清理observable

```
    var observable = Rx.Observable.from([10, 20, 30]);
    var subscription = observable.subscribe(x => console.log(x));
    subscription.unsubscribe()

    var observable = Rx.Observable.create(function subscribe(observer){
        //追踪interval 资源
        var intervalID = setInterval(()=>{
            observer.next('hi');
        },1000)

        return function unsubscribe(){
            clearInterval(intervalID);
        }
    })

function subscribe(observer){
        var intervalID = setInterval(()=>{
            observer.next('hi');
        },1000)

    return function unsubscribe(){
            clearInterval(intervalID)
    }
}

var unsubscribe = subscribe({next:(x)=>console.log(x)});

//稍后
unsubscribe();
```

## Observer(观察者)

```
var observable = Rx.Observable.create(function subscribe(observer) {
        try {
            observer.next(1);
            observer.next(2);
            observer.next(3);
            observer.complete();
        } catch (err) {
            observer.error(err); // 如果捕获到异常会发送一个错误
        }
    });
// var observer ={
//     next:x=> console.log('Oberver got a next value:'+x),
//     error:err=>console.log(err),
//     complete:()=>console.log('observer got a complete notification')
// }
//     observable.subscribe(observer)

    // observable.subscribe(x=>console.log('observer got a next value'+x));

    //在  observable.subscribe内部,它会创建一个观察者对象并使用第一个回调函数作为next处理方法.

    observable.subscribe(
        x=>console.log('observer got a next value'+x),
        err=>console.log('observe got a error:'+err),
        ()=>console.log('observer got a complete notification')
    )
```

## subscription (订阅)
```   
var observable = Rx.Observable.interval(1000);
var subscription = observable.subscribe(x => console.log(x));
    
//稍后
//这回取消正在进行中的Obersvable执行
//Observable执行时通过观察者调用subscribe方法启动的
subscription.unsubscribe();
```
可以合并在一起

```
var observable1 = Rx.Observable.interval(400);
var observable2 = Rx.Observable.interval(300);

var subscription = observable1.subscribe(x=>console.log('first:'+x));
var childSubscription = observable2.subscribe(x=>console.log('second:'+x));


subscription .add(childSubscription)
setTimeout(()=>{
subscription.unsubscribe()
},3000)
```

## subject(主体)
```
    var subject = new Rx.Subject();
    subject.subscribe({
        next:(v)=>console.log('objectA:'+v)
    });
    subject.subscribe({
        next:(v)=>console.log('observerB:'+v)
    });
    // subject.next(1);
    // subject.next(2);

var observable = Rx.Observable.from([1, 2, 3]);
    observable.subscribe(subject);// 你可以提供一个 Subject 进行订阅
```

## 多播的Observables (不太明白)
```
//'多播的Observable'通过subject来发送通知,这个subject可能有多个订阅者,
//然而普通的'单播Observable'只发送通知给单个观察者
//多播Observable在底层是通过使用subject使用多个观察者可以看见同一个Observable执行
//在底层这就是multicaset操作符的工作原理:订阅者订阅一个基础的subject,然后subject
// 订阅源 Observable.下面示例与前面使用Observable.subscribe(subject)示例类似
    var source = Rx.Observable.from([1,2,3]);
    var subject = new Rx.Subject();
    var multicasted = source.multicast(subject);

multicasted.subscribe({
    next:(v)=>console.log('observerA:'+v)
});
multicasted.subscribe({
    next:(v)=>console.log('observerB'+v)
});

multicasted.connect();
```

## 引用计数(?)
```
var source = Rx.Observable.interval(500);
var subject = new Rx.Subject();
var multicasted = source.multicast(subject);
var subscription1, subscription2, subscriptionConnect;

    subscription1 = multicasted.subscribe({
        next:(v)=>console.log('observarA:'+v)
    })

    subscriptionConnect = multicasted.connect();

    
    setTimeout(()=>{
        subscription2=multicasted.subscribe({
            next:v=>console.log('observaerB'+v)
        })
    },600) 

    setTimeout(()=>{
        subscription1.unsubscribe();
    },1200)

    setTimeout(()=>{
        subscription2.unsubscribe();
        subscriptionConnect.unsubscribe();
    },2000)
```

//refCount()方法(引用计数),我们可以使用ConnectableObservable的refCount()方法(引用计数),这个方法返回Observabe,
//这个Observable 会追踪有多少个订阅者,当订阅者数量从0遍1,它会调用connect(),以开启共享的执行,当订阅者数量从1变成0,
//他会完全被取消订阅,停止进一步的执行.

//refCount 的作用是,当有第一个订阅者时,多播Observable会自动的启动执行,而当最后一个订阅者离开时,多播Observable会自动地
//停止执行.

```
    var source = Rx.Observable.interval(500);
    var subject = new Rx.Subject();
    var refCounted = source.multicast(subject).refCount();
    var subscription1, subscription2, subscriptionConnect;

    // 这里其实调用了 `connect()`，
    // 因为 `refCounted` 有了第一个订阅者
    console.log('observerA subscribed');
    subscription1 = refCounted.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });

    setTimeout(() => {
        console.log('observerB subscribed');
        subscription2 = refCounted.subscribe({
            next: (v) => console.log('observerB: ' + v)
        });
    }, 600);

    setTimeout(() => {
        console.log('observerA unsubscribed');
        subscription1.unsubscribe();
    }, 1200);

    // 这里共享的 Observable 执行会停止，
    // 因为此后 `refCounted` 将不再有订阅者
    setTimeout(() => {
        console.log('observerB unsubscribed');
        subscription2.unsubscribe();
    }, 2000);
```
## BehaviorSubject
他有一个 `当前值`的概念,它保存了发送给消费者的最新值,并且当有新的观察者订阅时,会立即从`BehaviorSubject`那接收到'当前值'

```
    var subject = new Rx.BehaviorSubject(0);
    subject.subscribe({
        next:v=>console.log('observerA:'+v)
    })
    subject.next(1);
    subject.next(2);
    subject.subscribe({
        next:v=>console.log('observerB:'+v)
    })
    //
    subject.next(3);
```

## ReplaySubject
类似`BehaviorSubject`,它可以发送旧值给新的订阅者,但它可以记录Observable执行的一部分.
`ReplaySubject`记录`Observable`执行中的多个值并将其回放给新的订阅者

```
    var subject = new Rx.ReplaySubject(3);
subject.subscribe({
    next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);
//
subject.subscribe({
    next: (v) => console.log('observerB: ' + v)
});
//
subject.next(5);
```

指定window time 确定多久之前的值可以记录.
从下面的输出可以看出，第二个观察者得到的值是3、4、5，这三个值是订阅发生前的500毫秒内发生的：

```
var subject = new Rx.ReplaySubject(100, 500 /* windowTime */);
subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
    });

    var i = 1;
    setInterval(() => subject.next(i++), 200);

    setTimeout(() => {
        subject.subscribe({
            next: (v) => console.log('observerB: ' + v)
        });
    }, 1000);
```

## AsyncSubject
只有当 Observable 执行完成时(执行complete()),它才会执行的最后一个值发送给观察者

```
    var subject = new Rx.AsyncSubject();
    subject.subscribe({
        next:v=>console.log('observerA:'+v)
    });

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.next(4);
    subject.subscribe({
        next:v=>console.log('observer:'+v)
    })

    subject.next(5);
    subject.complete();
```
## 是什么是操作符
操作符是函数,它基于当前Observable创建一个新的Oberservable,这是一个无副作用的操作,前面的Observable保持不变

```
function multiplyByTen(input) {
    var output = Rx.Observable.create(function subscribe(observer) {
        input.subscribe({
            next: (v) => observer.next(10 * v),
            error: (err) => observer.error(err),
            complete: () => observer.complete()
        });
    });
    return output;
}

var input = Rx.Observable.from([1, 2, 3, 4]);
var output = multiplyByTen(input);
output.subscribe(x => console.log(x));
```

// 实例操作符 vs 静态操作符
//实例操作符是使用this关键字来指代输入的Obervable的函数
//静态操作符是附加到Observable类上的纯函数,通常是从头开始创建Observable.


## Marble diagrams(弹珠图)
## 选择操作符
- 我有一个已存在的 Observable， 然后...
- 我把一些 Observables 组合成了一个 Observable，然后...
- 我还没有 Observable， 然后...

##调度器 Scheduler
```
    var observable = Rx.Observable.create(function (observer) {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.complete();
    })
        .observeOn(Rx.Scheduler.async);

    console.log('just before subscribe');
    observable.subscribe({
        next: x => console.log('got value ' + x),
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => console.log('done'),
    });
    console.log('just after subscribe');
```
```
    var observable = Rx.Observable.create(function (proxyObserver) {
        proxyObserver.next(1);
        proxyObserver.next(2);
        proxyObserver.next(3);
        proxyObserver.complete();
    })
        .observeOn(Rx.Scheduler.async);

    var finalObserver = {
        next: x => console.log('got value ' + x),
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => console.log('done'),
    };

    console.log('just before subscribe');
    observable.subscribe(finalObserver);
    console.log('just after subscribe');
```
# 教程
```
   //zai在外部产生新事件
    var myObservable = new Rx.Subject();
   myObservable.subscribe(v=>console.log(v));
   myObservable.next('foo')
    
   //在内部差生数据
    var myObservable = Rx.Observable.create(observer=>{
        observer.next('foo');
        setTimeout(()=>observer.next('bar'),1000);
    })

   myObservable.subscribe(v=>console.log(v))
```

## 控制流动

```
// 输入 "hello world"
   var input = Rx.Observable.fromEvent(document.querySelector('input'), 'input');

   // 过滤掉小于3个字符长度的目标值
   input.filter(event => event.target.value.length > 2)
       .map(event => event.target.value)
       .subscribe(value => console.log(value)); // "hel"

   // 延迟事件
   input.delay(2000)
       .map(event => event.target.value)
       .subscribe(value => console.log(value)); // "h" -200ms-> "e" -200ms-> "l" ...
   //
   每200ms只能通过一个事件
   input.throttleTime(2000)
       .map(event => event.target.value)
       .subscribe(value => console.log(value)); // "h" -200ms-> "w"

   // 停止输入后200ms方能通过最新的那个事件
   input.debounceTime(200)
       .map(event => event.target.value)
       .subscribe(value => console.log(value)); // "o" -200ms-> "d"

   // 在3次事件后停止事件流
   input.take(3)
       .map(event => event.target.value)
       .subscribe(value => console.log(value)); // "hel"

   // // 直到其他 observable 触发事件才停止事件流 (没成功)
   var stopStream = Rx.Observable.fromEvent(document.querySelector('button'), 'click');
   input.takeUntil(stopStream)
       .map(event => event.target.value)
       .subscribe(value => console.log(value)); // "hello" (点击才能看到)
```
## 产生值

```
 // 输入 "hello world"
    var input = Rx.Observable.fromEvent(document.querySelector('input'), 'input');

 // 传递一个新的值
    input.map(event => event.target.value)
        .subscribe(value => console.log(value+"uuuu")); // "h"

//通过提取属性传递一个新的值
    input.pluck('target', 'value')
        .subscribe(value => console.log(value)); // "h"

//传递之前的两个值
    input.pluck('target', 'value').pairwise()
        .subscribe(value => console.log(value)); // ["h", "he"]

//只会通过唯一的值
    input.pluck('data').distinct()
        .subscribe(value => console.log(value)); // "h" "e" "l" "o"  "w" "r" "d"

// 不会传递重复的值
    input.pluck('data').distinctUntilChanged()
        .subscribe(value => console.log(value)); // "helo world"
```
##状态和存储 (State Store)

```
var increaseButton = document.querySelector('#increase');
    var increase = Rx.Observable.fromEvent(increaseButton, 'click')
    // 我们再一次映射到一个函数，它会增加 count
        .map(() => state => Object.assign({}, state, {count: state.count + 1}));

    var decreaseButton = document.querySelector('#decrease');
    var decrease = Rx.Observable.fromEvent(decreaseButton, 'click')
    // 我们还是映射到一个函数，它会减少 count
        .map(() => state => Object.assign({}, state, {count: state.count - 1}));

    var inputElement = document.querySelector('#input');
    var input = Rx.Observable.fromEvent(inputElement, 'keypress')
    // 我们还将按键事件映射成一个函数，它会产生一个叫做 inputValue 状态
        .map(event => state => Object.assign({}, state, {inputValue: event.target.value}));

    // 我们将这三个改变状态的 observables 进行合并
    var state = Rx.Observable.merge(
        increase,
        decrease,
        input
    ).scan((state, changeFn) => changeFn(state), {
        count: 0,
        inputValue: ''
    });

    // 我们订阅状态的变化并更新 DOM
    state.subscribe((state) => {
        document.querySelector('#count').innerHTML = state.count;
        document.querySelector('#hello').innerHTML = 'Hello ' + state.inputValue;
    });

    // 为了优化渲染，我们可以检查什么状态是实际上已经发生变化了的
    var prevState = {};
    state.subscribe((state) => {
        if (state.count !== prevState.count) {
            document.querySelector('#count').innerHTML = state.count;
        }
        if (state.inputValue !== prevState.inputValue) {
            document.querySelector('#hello').innerHTML = 'Hello ' + state.inputValue;
        }
        prevState = state;
    });
```