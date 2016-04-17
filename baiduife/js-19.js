// 通过id获取元素
function getByid(id){
    return document.getElementById(id);
}
    var oUl = getByid("ul1");
    //增加事件
    getByid("leftAdd").onclick =function(){
        var oLi = document.createElement("li");
        if(!isPositiveNum(getByid("add").value) || getByid("add").value< 10 || getByid("add").value>100){
            alert("请重新输入");
            getByid("add").value ="";
           return false;
        }
        oLi.innerHTML  = getByid("add").value;
        getByid("ul1").insertBefore(oLi,getByid("ul1").childNodes[0]);
        oUl.childNodes[0].addEventListener("click",removeObj,false);
    }
    getByid("rightAdd").onclick =function(){
        var oLi = document.createElement("li");
        if(!isPositiveNum(getByid("add").value) || getByid("add").value< 10 || getByid("add").value>100){
            alert("请重新输入");
            getByid("add").value ="";
            return false;
        }
        oLi.innerHTML  = getByid("add").value;
        getByid("ul1").appendChild(oLi);
        oUl.lastChild.addEventListener("click",removeObj,false);
    }
    getByid("leftRemove").onclick =function(){
        if(oUl.childNodes.length>0){
            oUl.removeChild(oUl.childNodes[0]);
        }
    }


getByid("rightRemove").onclick =function(){
    if(oUl.childNodes.length>0){
        oUl.removeChild(oUl.childNodes[0]);
    }
}

function removeObj(){
    this.parentNode.removeChild(this);
}


var NowLi = oUl.getElementsByTagName("li");
for(var i=0;i<NowLi.length;i++){
    NowLi[i].onclick =removeObj;
}

// 是否为正整数
function isPositiveNum(s){
    var re = /^[0-9]*[1-9][0-9]*$/ ;
    return re.test(s)
}

var data=[];
// 随即数按钮 增加点击事件
getByid("rand").onclick =function(){
    getByid("ul1").innerHTML="";
    for(var a=0;a<60;a++){
        var oLi = document.createElement("li");
        data[a] =rand.get(10,100)*5;
        oLi.style.height = rand.get(10,100)*5+"px";
        oLi.style.left = a*12+"px";
        getByid("ul1").insertBefore(oLi,getByid("ul1").childNodes[0]);
        oUl.childNodes[0].addEventListener("click",removeObj,false);
    }

}




// 随机数
var rand = {};
rand.get = function (begin,end){
    return Math.floor(Math.random()*(end-begin))+begin;
}

//增加排序事件

getByid("paixu").onclick =function (){
    insertSort(data);
    console.log(data);
}

//paixu
var timer = null;
function insertSort (arr) {
    console.log(arr);
    var len = arr.length;
    if (len <= 1) {
        return arr;
    }

var oLi = getByid("ul1").getElementsByTagName("li");
   var i=0
   timer =  setInterval(function(){
       var tmp = arr[i];
       oLi[i].style.backgroundColor="black";
       for (var j = i; j > 0 && arr[j - 1] > tmp; j--) {
           arr[j] = arr[j - 1];
           oLi[j].style.height =  arr[j - 1]+"px";
           oLi[j].style.backgroundColor="blue";
       }
       arr[j] = tmp;
       oLi[j].style.height =  tmp+"px";
       oLi[j].style.backgroundColor="blue";
       i++;
    },100)
    if(i>= len){clearInterval(timer)}
}

function sleep(n)
{
    var  start=new Date().getTime();
    while(true) if(new Date().getTime()-start>n)  break;
}