// 获取元素
function $(obj){return document.querySelector(obj)}
var oUl = $("#ul1");

$("#Add").onclick =function(){
    //多个空格替换为一个去掉两侧空格
   var val =trimStr($("#text").value.replace(/\s+/g, ' '));


    var data = val.split(/[._ ,、]|,/);
    console.log(data);
    for(var i = 0;i<data.length;i++){
        var oLi = document.createElement("li");
        if(data[i] == "") continue;
        oLi.innerHTML  = trimStr(data[i]).replace(" ","");
        oUl.insertBefore(oLi,oUl.childNodes[0]);
        oUl.childNodes[0].addEventListener("click",removeObj,false);
    }

};


function removeObj(){
    this.parentNode.removeChild(this);
}


var NowLi = oUl.getElementsByTagName("li");
for(var i=0;i<NowLi.length;i++){
    NowLi[i].onclick =removeObj;
}

function isPositiveNum(s){
    var re = /^[0-9]*[1-9][0-9]*$/ ;
    return re.test(s)
}


 //删除全部空格
function trimStr(str){return str.replace(/(^\s*)|(\s*$)/g,"");}

$("#serch").onclick =function(){
var oLi = oUl.querySelectorAll("li");
    debugger;
    var len= oLi.length;
    console.log($("#keyword").value);
    for(var i=0;i<len;i++){
        if(oLi[i].innerHTML.indexOf($("#keyword").value) != -1){
            oLi[i].style.color ="blue";
        }
    }
}