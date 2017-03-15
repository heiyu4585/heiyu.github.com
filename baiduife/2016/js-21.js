// 获取元素


function Obj() {
    var that = this;
    this.oUl = $("#ul1");
    this.oUl2 = $("#ul2");
    this.addObj = $("#Add");
    this.tag = $("#tag");
    this.renderData = [];
    this.textarea = $("#text");
    //数据添加
    this.addFn = function () {
        //多个空格替换为一个去掉两侧空格
        var val = that.trimStr($("#text").value.replace(/\s+/g, ' '));
        var data = val.split(/[._ ,、]|,/);
        that.render(data);
    };
    //数据渲染
    this.render = function (data) {
        data = this.delrep1(data);
        for (var i = 0; i < data.length; i++) {
            var oLi = document.createElement("li");
            if (data[i] == "") continue;
            if (that.oUl.getElementsByTagName("li").length > 10) {
                that.oUl.removeChild(that.oUl.lastChild);
                that.renderData.splice(0, 1);
            }
            if (renderData.in_array("data[i] ")) continue;
            that.renderData[that.renderData.length - 1] = data[i];
            oLi.innerHTML = that.trimStr(data[i]).replace(" ", "");
            that.oUl.insertBefore(oLi, that.oUl.childNodes[0]);
            that.oUl.childNodes[0].addEventListener("click", that.removeObj, false);
            that.oUl.childNodes[0].addEventListener("mouseover", that.newText, false);
            that.oUl.childNodes[0].addEventListener("mouseleave", that.oldText, false);
        }
    };
    //搜索
    this.serchFn = function () {
        var oLi = that.oUl.querySelectorAll("li");
        var len = oLi.length;
        for (var i = 0; i < len; i++) {
            if (oLi[i].innerHTML.indexOf($("#keyword").value) != -1) {
                oLi[i].style.color = "blue";
            }
        }
    };
    this.trimStr = function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    };    // //删除全部空格

    this.removeObj = function () {
        this.parentNode.removeChild(this);
    };
    this.newText = function () {
        this.innerHTML = "删除标签" + this.innerHTML;
        this.style.backgroundColor = "blue";
    };
    this.oldText = function () {
        this.innerHTML = this.innerHTML.replace("删除标签", "");
        this.style.backgroundColor = "red";
    };
    this.key = function (event) {
        if (event.which === 13 || event.which === 188 || event.which === 32) {
            var val = that.trimStr(this.value.replace(/\s+/g, ' '));
            that.loveRender(val);
            this.value = "";
        }
    };

    //数据渲染
    this.loveRender = function (data) {
        var oLi = document.createElement("li");
        if (data == "") return;
        if (that.oUl2.getElementsByTagName("li").length > 10) {
            that.oUl2.removeChild(that.oUl2.lastChild);
        }

        oLi.innerHTML = that.trimStr(data).replace(" ", "");
        that.oUl2.insertBefore(oLi, that.oUl2.childNodes[0]);
        that.oUl2.childNodes[0].addEventListener("click", that.removeObj, false);
        that.oUl2.childNodes[0].addEventListener("mouseover", that.newText, false);
        that.oUl2.childNodes[0].addEventListener("mouseleave", that.oldText, false);

    };
    this.init = function () {
        this.addObj.addEventListener("click", this.addFn, false);
        this.tag.addEventListener("keydown", this.key, false);
    };
    this.delrep1 = function getArray(a) {
        var hash = {},
            len = a.length,
            result = [];

        for (var i = 0; i < len; i++) {
            if (!hash[a[i]]) {
                hash[a[i]] = true;
                result.push(a[i]);
            }
        }
        return result;
    };


}
window.Array.prototype.S = String.fromCharCode(2);
Array.prototype.in_array = function (e) {
    var r = new RegExp(this.S + e + this.S);
    return (r.test(this.S + this.join(this.S) + this.S));
};
var objNew = new Obj();
objNew.init();


function $(obj) {
    return document.querySelector(obj)
}