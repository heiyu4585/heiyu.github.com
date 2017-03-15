// JavaScript Document
function id(obj) {
    return document.getElementById(obj);
}
function bind(obj, ev, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
function addClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

function fnLoad()
{
	//判断动画执行完成 和  页面(图片加载完成)
	var aTime = new Date().getTime();
	var banmaite =false;
	var oTimer = null;
	var bIMG =false;
	var  oW =id("welcome");
	bind(oW,"transitionend",end);
	bind(oW,"webkitTransitionEnd",end);
	oTimer =setInterval(function(){
		if( new Date().getTime() - aTime >=5000){
			banmaite = true;
		}
		//需要判断是否加载完成
		bIMG =true;
		if(banmaite && bIMG){
			oW.style.opacity = 0;
			clearInterval(oTimer);
		}
	},1000);
	function end(){
		removeClass(oW,"pageShow");
        fnTab();
	}
}

//滑动轮播图

function fnTab(){
    var oTab=id("tabPic");
    var oList = id("picList");
    var oLi = oList.getElementsByTagName("li");
    var iW = view().w;
    var iNow = 0;
    var oTimer = null;
    var iStartX = 0;
    var oPicmak = id("picMask");
    var aNav=oTab.getElementsByTagName("nav")[0].children;
    var iX = 0;
    function doMove(){
        oList.style.transform =  "translatex("+ (-iW*iNow)+"px)";
        oList.style.transition="0.5s";
        for(var i=0;i<aNav.length;i++){
            removeClass(aNav[i],"active");
        }
        addClass(aNav[iNow],"active");
        iNow++;
        iNow = iNow % oLi.length;
    }
    bind(oTab,"touchstart",toStart);
    bind(oTab,"touchmove",toMove);
    bind(oTab,"touchend",toEnd);
    atuoPlay();
    function atuoPlay(){
        oTimer = setInterval(doMove,2000);
    }

    function toStart(ev){
        oList.style.transition="none";
     ev= ev.changedTouches[0]; //获取第一个触点
        iStarttouchX = ev.pageX; //页面触点X坐标
        clearInterval(oTimer);
        iStartX = iX;
    }
    function toMove(ev){
        var  ev = ev.changedTouches[0]; //获取第一个触点

        var iDis = ev.pageX - iStarttouchX; //改变的位置
        iX = iStartX +iDis;
        oList.style.transform =  "translatex("+ iX+"px)";
    }
    function toEnd(){
       iNow= -Math.round(iX/iW);
        if(iNow<0){
            iNow = 0;
        }
        if(iNow>oLi.length-1){
            iNow = oLi.length-1;
        }
        doMove();
        atuoPlay();

    }

}

function fnScore(){
    var oList = id("score").querySelectorAll("li");
    for(var i =0;i<oList.length;i++){
        fnNav(oList[i]);
    }
    function fnNav(oLi){
        var oA = oLi.querySelector("nav").querySelectorAll("a");
        for(var i=0;i<oA.length;i++){
            oA[i].index = i;
            bind( oA[i],"touchstart",function(){
                for(var i=0;i<oA.length;i++) {

                    if (oA[i].index <= this.index) {
                        addClass(oA[i], "active")
                    } else {
                        removeClass(oA[i], "active")
                    }
                }
            })
        }
    }


}