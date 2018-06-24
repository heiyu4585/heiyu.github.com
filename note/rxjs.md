#rxjs 相关
## 是什么
1. 响应式编程
2. 事件流的控制
## 为什么要用

## 怎么用(做个什么demo)
[RxJS 实战篇（一）拖拽](http://jerryzou.com/posts/rxjs-practice-01/)


### demo1 div跟随鼠标拖动
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdn.bootcss.com/rxjs/5.5.9/Rx.js"></script>
    <!--<script src="https://cdn.bootcss.com/rxjs/6.1.0/rxjs.umd.js"></script>-->
    <style>
        #box {
            transform: translate(10px, 10px);
            transition: 0.05s transform ease-out;
            width: 40px;
            height: 40px;
            background: orange;
            border: 5px solid red;
            cursor: pointer;
        }

    </style>
</head>
<body>
<div id="box"></div>
<script src="https://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
<script>
    const box = document.getElementById('box')
    const mouseDown$ = Rx.Observable.fromEvent(box, 'mousedown')
    const mouseMove$ = Rx.Observable.fromEvent(document, 'mousemove')
    const mouseUp$ = Rx.Observable.fromEvent(document, 'mouseup')
    //鼠标点击后 将 坐标传递给 switchMap
    //执行一次
    mouseDown$.map((event) => ({
            x: event.clientX,
            y: event.clientY
        })
    ).switchMap((event) => {

        //鼠标移动着执行
        //一直在执行
        return mouseMove$.map((moveEvent) => {
            console.log("-------")
            console.log("移动前的坐标",{
                x:event.x,
                y:event.y
            });
            console.log("移动后的坐标",{
                x:moveEvent.clientX,
                y:moveEvent.clientY
            });
            console.log("+++++++++");
            //返回移动时当前坐标
                return {
                    x: moveEvent.clientX,
                    y: moveEvent.clientY
                }
            }
        )
        //一直会执行,直到鼠标抬起
            .takeUntil(mouseUp$)

    }).subscribe(toXY => {
        //一直执行直到鼠标抬起
        console.log("toXy", toXY);
        $("#box").offset({top: toXY.y, left: toXY.x})
    });
</script>
</body>
</html>
```
#### 参考
#####概念
```
    // 将每次点击映射为这次点击的 clientX
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var positions = clicks.map(ev => ev.clientX);
    positions.subscribe(x => console.log(x));
    // 每次点击返回一个 interval Observable
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
    result.subscribe(x => console.log(x));
    //每秒都发出值，直到第一次点击发生
    var interval = Rx.Observable.interval(1000);
    var clicks = Rx.Observable.fromEvent(document, 'click');
    var result = interval.takeUntil(clicks);
    result.subscribe(x => console.log(x));
```
#### 目标
```
const box = document.getElementById('box')
    const mouseDown$ = Rx.Observable.fromEvent(box, 'mousedown')
    const mouseMove$ = Rx.Observable.fromEvent(document, 'mousemove')
    const mouseUp$ = Rx.Observable.fromEvent(document, 'mouseup')




    mouseDown$.map((event) => (

        {
        pos: getTranslate(box),
        event,
    }))
        .switchMap((initialState) => {
            console.log(initialState);
            const initialPos = initialState.pos
            const { clientX, clientY } = initialState.event
            return mouseMove$.map((moveEvent) => ({
                x: moveEvent.clientX - clientX + initialPos.x,
                y: moveEvent.clientY - clientY + initialPos.y,
            }))
                .takeUntil(mouseUp$)
        })
        .subscribe((pos) => {
            console.log("治理只能执行一次")
            setTranslate(box, pos)
        })

    function setTranslate (element, pos) {
        box.style.transform = `translate(${pos.x}px, ${pos.y}px)`
    }

    function getTranslate (element) {
        const style = getComputedStyle(element)
        const regExp = /matrix\((\d+,\s){4}(\d+),\s(\d+)/i
        const result = style.transform.match(regExp)
        if (result) {
            return {
                x: parseInt(result[2], 10),
                y: parseInt(result[3], 10)
            }
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
```
## demo2 延迟200毫秒,才可移动
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdn.bootcss.com/rxjs/5.5.9/Rx.js"></script>
    <!--<script src="https://cdn.bootcss.com/rxjs/6.1.0/rxjs.umd.js"></script>-->
    <style>
        #box {
            transform: translate(10px, 10px);
            transition: 0.05s transform ease-out;
            width: 40px;
            height: 40px;
            background: orange;
            border: 5px solid red;
            cursor: pointer;
        }

        .blink {
            animation: 0.4s linear blinking;
        }

        @keyframes blinking {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    </style>
</head>
<body>
<div id="box" ></div>
<script src="https://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
<script>
    const box = document.getElementById('box')
    const mouseDown$ = Rx.Observable.fromEvent(box, 'mousedown')
    const mouseMove$ = Rx.Observable.fromEvent(document, 'mousemove')
    const mouseUp$ = Rx.Observable.fromEvent(document, 'mouseup')


    //鼠标点击后 将 坐标传递给 switchMap
    //执行一次
    mouseDown$.map((event) => {
        return Rx.Observable.of({
            x: event.clientX,
            y: event.clientY
        })
            .delay(200)
            .takeUntil(mouseMove$)
    })
        .switchMap((event) => {
            // $("#box").addClass("bling");
            box.classList.add('blink')

            //鼠标移动着执行
            //一直在执行
            return mouseMove$.map((moveEvent) => {
                    console.log("-------")
                    console.log("移动前的坐标", {
                        x: event.x,
                        y: event.y
                    });
                    console.log("移动后的坐标", {
                        x: moveEvent.clientX,
                        y: moveEvent.clientY
                    });
                    console.log("+++++++++");
                    //返回移动时当前坐标
                    return {
                        x: moveEvent.clientX,
                        y: moveEvent.clientY
                    }
                }
            )
            //一直会执行,直到鼠标抬起
                .takeUntil(mouseUp$)

        }).subscribe(toXY => {
        //一直执行直到鼠标抬起
        console.log("toXy", toXY);
        $("#box").offset({top: toXY.y, left: toXY.x})
    });

</script>
</body>
</html>
```

## demo3 div跟随鼠标


```
  const headBox = document.getElementById('head')
    const mouseDown$ = Rx.Observable.fromEvent(headBox, 'mousedown')
    const mouseMove$ = Rx.Observable.fromEvent(document, 'mousemove')
    const mouseUp$ = Rx.Observable.fromEvent(document, 'mouseup')
    const boxes = document.getElementsByClassName('box');
    console.log("----");
    //得需要一个数组
    let arr=[];
    for(var i=0;i<boxes.length;i++){
        arr.push(boxes[i])
    }
    //向下面相等
    // const delayBoxes$ = Rx.Observable.from([].slice.call(boxes, 0))

    const delayBoxes$ = Rx.Observable.from(arr)
        .zip(Rx.Observable.interval(100).startWith(0), (box) => box)
    

    //鼠标点击后 将 坐标传递给 switchMap
    //执行一次
    mouseDown$.map((event) => {
        console.log(111)

        return Rx.Observable.of({
            x: event.clientX,
            y: event.clientY
        })
            .delay(200)
            .takeUntil(mouseMove$)
    })
        .switchMap((event) => {
            //鼠标移动着执行
            //一直在执行
            return mouseMove$.map((moveEvent) => {
                    console.log("-------")
                    console.log("移动前的坐标", {
                        x: event.x,
                        y: event.y
                    });
                    console.log("移动后的坐标", {
                        x: moveEvent.clientX,
                        y: moveEvent.clientY
                    });
                    console.log("+++++++++");
                    //返回移动时当前坐标
                    return {
                        x: moveEvent.clientX,
                        y: moveEvent.clientY
                    }
                }
            )
            //一直会执行,直到鼠标抬起
                .takeUntil(mouseUp$)

        }).mergeMap(toXY => {
        //一直执行直到鼠标抬起
        console.log("toXy", toXY);
        return delayBoxes$.do(box => {
            $(box).offset({top: toXY.y, left: toXY.x});
        })

    }).subscribe();


```

### 概念
```
 // zip 将多个 Observable 组合以创建一个 Observable，该 Observable 的值是由所有输入 Observables 的值按顺序计算而来的。

    // // 从不同的源头结合年龄和名称
    //
    //  let of=Rx.Observable.of;
    //  let zip=Rx.Observable.zip;
    //
    //  const sourceOne = of('Hello');
    //  const sourceTwo = of('World!');
    //  const sourceThree = of('Goodbye');
    //  const sourceFour = of('World!');
    //  // 一直等到所有 observables 都发出一个值，才将所有值作为数组发出
    //
    //  const example = zip(
    //      sourceOne,
    //      sourceTwo.delay(1000),
    //      sourceThree.delay(2000),
    //      sourceFour.delay(3000)
    //  );
    //  // 输出: ["Hello", "World!", "Goodbye", "World!"]
    //  const subscribe = example.subscribe(val => console.log(val));
    //
    //  //## mergeMap
    //  //将每个字母映射并打平成一个 Observable ，每1秒钟一次
    //  var letters = Rx.Observable.of('a', 'b', 'c');
    //  var result = letters.mergeMap(x =>
    //      Rx.Observable.interval(1000).map(i => x+i)
    //  );
    //  result.subscribe(x => console.log(x));

```

### 目标
```
const headBox = document.getElementById('head')
const boxes = document.getElementsByClassName('box')
const mouseDown$ = Rx.Observable.fromEvent(headBox, 'mousedown')
const mouseMove$ = Rx.Observable.fromEvent(document, 'mousemove')
const mouseUp$ = Rx.Observable.fromEvent(document, 'mouseup')
const delayBoxes$ = Rx.Observable.from([].slice.call(boxes, 0))
  .zip(Rx.Observable.interval(100).startWith(0), (box) => box)

mouseDown$.map((e) => {
  const pos = getTranslate(headBox)
  return {
    pos,
    event: e,
  }
})
.switchMap((initialState) => {
  const initialPos = initialState.pos
  const { clientX, clientY } = initialState.event
  return mouseMove$.map((moveEvent) => ({
    x: moveEvent.clientX - clientX + initialPos.x,
    y: moveEvent.clientY - clientY + initialPos.y,
  }))
  .takeUntil(mouseUp$)
})
.mergeMap((pos) => {
  return delayBoxes$.do((box) => {
    setTranslate(box, pos)
  })
})
.subscribe()
```


## rxjs与vue结合 博客

## 参考资料

[30 天精通 RxJS (00)： 關於本系列文章](https://ithelp.ithome.com.tw/users/20103367/ironman/1199)

[学习 RxJS](https://rxjs-cn.github.io/learn-rxjs-operators/)


 [Rxjs](https://cn.rx.js.org/manual/overview.html#h33)
 
 [RxJS 教程](https://segmentfault.com/a/1190000004293922) 看不太进去,备份
 
 [构建流式应用—RxJS详解](http://www.alloyteam.com/2016/12/learn-rxjs/)
 
 [Rxjs入门教程](https://www.jianshu.com/p/294230401c44)  (一个不错的博主,其他文章也需要学习下)

[探索RxJS-CoreConcept.md](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/RxJS/%E6%8E%A2%E7%B4%A2RxJS-CoreConcept.md)

[探索RxJS-做一个github小应用.md](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/RxJS/%E6%8E%A2%E7%B4%A2RxJS-%E5%81%9A%E4%B8%80%E4%B8%AAgithub%E5%B0%8F%E5%BA%94%E7%94%A8.md)

- 一个不错的博主,其他文章也需要学习下

[用 RxJS 实现一个协同编辑的表格应用](https://blog.souche.com/rxjs-excel/)




[构建流式应用—RxJS详解 ](https://github.co)(--入门)
