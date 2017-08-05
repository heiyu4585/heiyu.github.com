```
var c= document.getElementById("myCanvas");
var ctx=c.getContext('2d');
//ctx.fillStyle='#000';
//ctx.fillRect(0,0,150,70)
/*
* 画一条横线
* */
//ctx.moveTo(100,100);
//ctx.lineTo(200,100);
//ctx.stroke();

/*
* 圆形
* */
//ctx.beginPath();
//ctx.arc(95,50,40,0,2*Math.PI)
//    ctx.stroke();
/*
* 文本
* */
//ctx.font="30px Arial";
//ctx.fillText("Hello world",10,90)
//ctx.strokeText("Hello world",10,30)

/*
* 线性渐变
* */
//var grd =ctx.createLinearGradient(0,0,200,0);
//grd.addColorStop(0,"red");
//grd.addColorStop(1,"white");
//
//ctx.fillStyle=grd;
//ctx.fillRect(10,10,150,80);

/*
* 径向渐变/圆渐变
* */

//var grd = ctx.createRadialGradient(75,50,5,90,60,100);
//grd.addColorStop(0,"red");
//grd.addColorStop(1,"white");
//
//ctx.fillStyle = grd;
//ctx.fillRect(10,10,150,80)
/*
* 绘制图片
* */

var img = document.getElementById("scream");
img.onload = function(){
    ctx.drawImage(img,10,10)
}
```