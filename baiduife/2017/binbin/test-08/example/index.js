window.onload = function(){
    var EventUtil = {
        addHandler: function(element, type, handler){
            if(element.addEventListener){
                element.addEventListener(type, handler, false);
            }else if(element.attachEvent){
                element.attachEvent("on" + type, handler);
            }else{
                element["on" + type] = handler;
            }
        }
    };

    var dftBtn = document.getElementsByTagName("button")[0];
    var bftBtn = document.getElementsByTagName("button")[1];
    var dftSearch = document.getElementsByTagName("button")[2];
    var bftSearch = document.getElementsByTagName("button")[3];
    var root = document.getElementById("root");
    var order = [];
    var timer = null;
    //深度优先遍历
    function traverseDF(node) {
        if(node!=null){
            order.push(node);
            for(var i=0;i<node.children.length;i++){
                traverseDF(node.children[i]);
            }
        }
    }
    //广度优先遍历
    function traverseBF(node) {
        if(node!=null){
            order.push(node);
            traverseBF(node.nextElementSibling);
            node=order[index++];
            traverseBF(node.firstElementChild);
        }
    }

    //颜色改变函数
    function changeColor(txt){
        var i = 0;
        if(order[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g,"")==txt){
            order[i].style.backgroundColor = "#00f";
        }else {
            order[i].style.backgroundColor="#f00";
            timer=setInterval(function () {
                i++;
                if(i<order.length){
                    order[i-1].style.backgroundColor="#fff";
                    if(order[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g,"")==txt){
                        order[i].style.backgroundColor="#00f";
                        clearInterval(timer);
                    }else {
                        order[i].style.backgroundColor="#f00"
                    }
                }else {
                    clearInterval(timer);
                    order[order.length-1].style.backgroundColor="#fff";
                    if(txt!=null){
                        alert("未搜索到该字符");
                    }
                }
            },1000);
        }
    }
    //初始化函数
    function initialize(){
        //在执行当前遍历时可以取消上一遍历，使得不会出现多重遍历的情况。
        index=0;
        order = [];
        clearInterval(timer);
        //background-color属性的默认值是transparent，缺少下列循环会导致背景色透明可见。
        var divList = document.getElementsByTagName("div");
        for(var i = 0; i < divList.length; i++){
            divList[i].style.backgroundColor = "#fff";
        }
    }

    EventUtil.addHandler(dftBtn, "click", function(){
        initialize();
        traverseDF(root);
        changeColor();
    });

    EventUtil.addHandler(bftBtn, "click", function(){
        initialize();
        traverseBF(root);
        changeColor();
    });

    EventUtil.addHandler(dftSearch, "click", function(){
        var txt=document.getElementsByTagName("input")[0].value;
        initialize();
        traverseDF(root);
        if(txt!=""){
            changeColor(txt);
        }else {
            alert("请输入查询字符！");
        }
    })
    EventUtil.addHandler(bftSearch, "click", function(){
        var txt=document.getElementsByTagName("input")[0].value;
        initialize() ;
        traverseBF(root);
        if(txt!=""){
            changeColor(txt);
        }else {
            alert("请输入查询字符！");
        }
    })

}