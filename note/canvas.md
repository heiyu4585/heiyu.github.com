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
#绘制矩形

```markdown
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>封装绘制矩形方法</title>
</head>
<body>
<div id="canvas-warp">
    <canvas id="canvas" style="border: 1px solid #aaaaaa; display: block; margin: 50px auto;">
        你的浏览器居然不支持Canvas？！赶快换一个吧！！
    </canvas>
</div>

<script>
    window.onload = function(){
        var canvas = document.getElementById("canvas");
        canvas.width = 800;
        canvas.height = 600;
        var context = canvas.getContext("2d");

      for(var i =0;i<20;i++){
          context.beginPath();
          drawRect(context, 200 + 10 * i, 100 + 10 * i, 400 - 20 * i, 400 - 20 * i,"black");
          context.stroke();
      }
        context.fillStyle = "black";
        context.lineWidth = 5;

        context.fill();
        context.stroke();
    }

    function drawRect(cxt ,x, y, height, width,strokeStyle){
        cxt.rect(x, y, height, width);
        cxt.lineWidth = 5;
        cxt.strokeStyle = strokeStyle;
    }
</script>
</body>
</html>
</body>
</html>
```
# 线条的属性
1. lineCap属性
    `butt`,`round`,`square`
```markdown
 window.onload = function(){
        var canvas = document.getElementById("canvas");
        canvas.width = 800;
        canvas.height = 600;
        var context = canvas.getContext("2d");

            context.beginPath();
            context.moveTo(100,100);
            context.lineTo(200,200);
            context.lineTo(300,100);



        context.fillStyle = "black";
        context.lineWidth = 100;
        context.strokeStyle = "red";
        
//        context.lineCap  = "round";
        context.lineCap  = "square";
        context.stroke();

        context.beginPath();
        context.moveTo(400,100);
        context.lineTo(500,200);
        context.lineTo(600,100);

        context.fillStyle = "black";
        context.lineWidth = 100;
        context.strokeStyle = "red";

        context.lineCap  = "butt";
        context.stroke();
    }
```
2.lineJoin
- miter
- bevel
- round
3. lineWidth
4. 笔触样式



