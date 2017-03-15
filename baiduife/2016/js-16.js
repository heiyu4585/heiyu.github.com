/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var city = trimStr(document.getElementById("aqi-city-input").value);
  var value= trimStr(document.getElementById("aqi-value-input").value);
  var re=/^[A-Za-z]+$/;
  for(var i= 0,j=0;i<city.length;i++){
    str = city.substr(i,1);
    console.log(str);
    if( !/^[\u4e00-\u9fa5]+$/i.test(str) && !re.test(str)){
      alert("只能是中英文");
      return;
    }
  }

  if(!isPositiveNum(value)){
     alert("不是整数");
    return;
  }
  //去掉前后空格
  function trimStr(str){return str.replace(/(^\s*)|(\s*$)/g,"");}
  aqiData[city] = value;

  console.log(aqiData);
}
//是否为正整数
function isPositiveNum(s){
  var re = /^[0-9]*[1-9][0-9]*$/ ;
  return re.test(s)
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var table =  document.getElementById("aqi-table");
  var oTr =document.createElement("tr");
  table.innerHTML=" <tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"
  table.appendChild(oTr);
  for( x in aqiData){
    var oTr =document.createElement("tr");
    oTr.innerHTML=" <tr><td>"+x+"</td><td>"+aqiData[x]+"</td><td><button dd="+x+">删除</button></td></td></tr>"
    table.appendChild(oTr);
  }

  var oDelBtn=document.getElementById("aqi-table").getElementsByTagName('button');
  var len = oDelBtn.length;
  for(var i=0;i<len;i++){
    oDelBtn[i].addEventListener("click",delBtnHandle);
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
 var x = this.getAttribute("dd");
   delete aqiData[x];

  renderAqiList();
}

function init() {
  window.onload=function(){

console.log(aqiData);
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").addEventListener("click",addBtnHandle);

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
   var oDelBtn=document.getElementById("aqi-table").getElementsByTagName('button');
    var len = oDelBtn.length;
    if(len){
      for(var i=0;i<len;i++){
        oDelBtn[i].addEventListener("click",delBtnHandle());
      }

    };
  }
}

init();