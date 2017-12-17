刚从南方回来就分了一个刮刮卡效果的页面，特么的我在烦恼怎么用H5去实现这个效果呢，好不容易写出来了，产品居然说：“既然你可以写出来这个效果那当然好了，开始我只是打算让你实现点击就出现呢！”… … 尼玛干嘛不早说呢？？？？？真是自找麻烦。既然写了就分享给大家吧，这个效果其实很早就有了，只是我们不常用到罢了。H5的Canvas我很坦然的说我不会。但是既然工作上需要就需要学习一下了。虽然有demo但是自己写的时候还是出现了很多的bug。下面给大家说一下实现刮刮卡效果的步骤吧。（ps：按照我自己的demo讲了）

ggl1

刮刮卡需求：

每一位用户有三次刮刮卡的机会
本次刮刮卡的结果会覆盖上次的结果
刮刮卡的中奖几率呈现为递增的曲线（保证三次中必须有一次中奖）
刮出的结果包含按钮既（领取奖品 or 再来一次 ）
分享活动奖品升级（这里主要是微信分享的回调了）
我们自己的需求，今天就说怎么制作刮刮卡，有这样需求的可以找我要源码
第一、body创建Canvas

 <div class="info" id="prize">
     <span id="prompt"></span>
     <span class="btn" id="ok">领取奖品</span>
    <span class="btn" id="no">再来一次</span>
 </div>
 <canvas id="c1" class="canvas"></canvas>
这里我们首先创建了一个Canvas，并且在canvas底部加上了刮开后的效果。

第二、 页面加载后开始初始化画布

首先定义一些需要的变量

 var c1; //画布
 var ctx; //画笔
 var ismousedown; //标志用户是否按下鼠标或开始触摸
 var isOk=0; //标志用户是否已经刮开了一半以上
 var fontem = parseInt(window.getComputedStyle(document.documentElement, null)["font-size"]);//这是为了不同分辨率上配合@media自动调节刮的宽度
页面加载后开始初始化画布（这样子就可以在页面创建一个画布了）

window.onload = function(){ 
    c1 = document.getElementById("c1");
    //这里很关键，canvas自带两个属性width、height,我理解为画布的分辨率，跟style中的width、height意义不同。
    //最好设置成跟画布在页面中的实际大小一样
    //不然canvas中的坐标跟鼠标的坐标无法匹配
    c1.width=c1.clientWidth;
    c1.height=c1.clientHeight;
    ctx = c1.getContext("2d");
    //PC端的处理
    c1.addEventListener("mousemove",eventMove,false);
    c1.addEventListener("mousedown",eventDown,false);
    c1.addEventListener("mouseup",eventUp,false);
    //移动端的处理
    c1.addEventListener('touchstart', eventDown,false);
    c1.addEventListener('touchend', eventUp,false);
    c1.addEventListener('touchmove', eventMove,false);
    //初始化
    initCanvas();
 }
第三、画灰色的矩形铺满

function initCanvas(){//网上的做法是给canvas设置一张背景图片，我这里的做法是直接在canvas下面另外放了个div
     //c1.style.backgroundImage="url(中奖图片.jpg)";
     ctx.globalCompositeOperation = "source-over";
     ctx.fillStyle = '#aaaaaa';
     ctx.fillRect(0,0,c1.clientWidth,c1.clientHeight);
     ctx.fill();
     ctx.font = "Bold 30px Arial";
                 ctx.textAlign = "center";
                 ctx.fillStyle = "#999999";
                 ctx.fillText("刮一刮",c1.width/2,50);//把这个属性设为这个就可以做出圆形橡皮擦的效果
     //有些老的手机自带浏览器不支持destination-out,下面的代码中有修复的方法
     ctx.globalCompositeOperation = 'destination-out';
}
第四、鼠标按下 和 触摸开始

function eventDown(e){
    e.preventDefault();
    ismousedown=true;
}
第五、鼠标抬起 和 触摸结束

function eventUp(e){
    e.preventDefault();
    //得到canvas的全部数据
    var a = ctx.getImageData(0,0,c1.width,c1.height);
    var j=0;
    for(var i=3;i<a.data.length;i+=4){
        if(a.data[i]==0)j++;
    }
    //当被刮开的区域等于一半时，则可以开始处理结果
    if(j>=a.data.length/8){
        isOk = 1;
    }
    ismousedown=false;
 }
第六、鼠标移动 和 触摸移动

 //鼠标移动 和 触摸移动
 function eventMove(e){
     e.preventDefault();
     if(ismousedown) {
         if(e.changedTouches){
             e=e.changedTouches[e.changedTouches.length-1];
         }
         var topY = document.getElementById("top").offsetTop;
         var oX = c1.offsetLeft,
         oY = c1.offsetTop+topY;
         var x = (e.clientX + document.body.scrollLeft || e.pageX) - oX || 0,
         y = (e.clientY + document.body.scrollTop || e.pageY) - oY || 0;

         //画360度的弧线，就是一个圆，因为设置了ctx.globalCompositeOperation = 'destination-out';
         //画出来是透明的
         ctx.beginPath();
         ctx.arc(x, y, fontem*1.2, 0, Math.PI * 2,true);

         //下面3行代码是为了修复部分手机浏览器不支持destination-out
         //我也不是很清楚这样做的原理是什么
         c1.style.display = 'none';
         c1.offsetHeight;
         c1.style.display = 'inherit'; 
         ctx.fill();
     }
     if(isOk){
         var btn = document.getElementsByClassName("btn");
             for(var i=0; i<btn.length; i++){
                 btn[i].style.zIndex = '3';
             }
             document.getElementsByClassName("btn")[0].style.zIndex="3";
     }
 }
第七： 如果没有抽中再来一次

很明显，再来一次就是初始化所有的值，画布重新加载，但是如果有次数限制的需求，务必在这里计算清楚。

注：由于我们要求的比较多今天就不说怎么计算中奖概率的方法了。有需要的效果版可以单独找我来要案例。写错的地方欢迎指出。

案例请自行下载。