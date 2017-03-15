function getByid(id){
    return document.getElementById(id);
}
var oUl = getByid("ul1");
console.log(getByid("add").value);
    getByid("leftAdd").onclick =function(){
        var oLi = document.createElement("li");
        if(!isPositiveNum(getByid("add").value)){
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
        oLi.innerHTML  = getByid("add").value;
        getByid("ul1").appendChild(oLi);
        oUl.lastChild.addEventListener("click",removeObj,false);
    }


    getByid("leftRemove").onclick =function(){
        oUl.removeChild(oUl.childNodes[0]);
    }
getByid("rightRemove").onclick =function(){
    oUl.removeChild(oUl.lastChild);
}

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