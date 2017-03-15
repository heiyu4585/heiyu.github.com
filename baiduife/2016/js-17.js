/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {

};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var str ="<ul class='"+pageState.nowGraTime+"'>";
    var i=0;j=0;
    var color =["black","red","green"]
        console.log(chartData);
   for(x in chartData ){
       if(chartData[x]>300){j=0}else if(chartData[x]>100){j=1}else{j=2};
       switch (pageState.nowGraTime){
           case "day": iWith = 7;break;
           case "week": iWith =30;break;
           case "month" :iWith =70;break;
       }
        str+="<li title='日期:"+x+"温度"+chartData[x]+"' style='height:"+chartData[x]+"px;left:"+((i++)*iWith)+"px;background: "+color[j]+"'></li>"
   }
    str+= "</ul>";
    document.getElementsByClassName("aqi-chart-wrap")[0].innerHTML = str;
        //alert(i);


}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(value) {
    // 确定是否选项发生了变化
    if(pageState.nowGraTime == value){
       return false;
    }
    // 设置对应数据
    pageState.nowGraTime =value;
    // 调用图表渲染函数
    initAqiChartData();
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    if(pageState.nowGraTime === getByid("city-select").value){
        return false;
    }
    // 设置对应数据
    pageState.nowSelectCity = getByid("city-select").value;
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
   var clickRadio = getByid("form-gra-time").getElementsByTagName("input");
    for(var i=0;i< clickRadio.length;i++){
        clickRadio[i].addEventListener("click",function(){
            graTimeChange(this.value);
        },false)
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var str="";
    for( x in aqiSourceData){
        str+=" <option>"+x+"</option>"
    }
    getByid("city-select").innerHTML= str;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    getByid("city-select").onchange = function(){
        citySelectChange();
    }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中

    if(pageState.nowGraTime =="day"){
        for( x in aqiSourceData[pageState.nowSelectCity]){
            chartData[x] =aqiSourceData[pageState.nowSelectCity][x];
        }
    }else if(pageState.nowGraTime =="week"){
        var xNow = new Date("2016-01-01").getMonth(); //当前月数-1
        chartData ={};
        var num = 0;   //总数温度
        j=1;          //当前星期的天数
        n=1;            //当前星期数
        for( x in aqiSourceData[pageState.nowSelectCity]){
            //debugger;
               if( xNow !== new Date(x).getMonth()){
                   xNow = new Date(x).getMonth();
                    n=1;
               }else{
                    if(new Date(x).getDay() == 0){
                        num +=aqiSourceData[pageState.nowSelectCity][x];
                        chartData[((new Date(x).getFullYear()+"-"+(xNow+1)+"月 第"+n+"星期 "))] = Math.floor(num /j);
                        console.log();
                        j=1;num=0;
                        n++;
                    }else{
                        num +=aqiSourceData[pageState.nowSelectCity][x];
                        j++;
                    }
               }
           }
    }else  if(pageState.nowGraTime =="month"){
        chartData ={};
        var j= 1,     //启示天数
            num = 0;  //总数温度
        var xNow = new Date("2016-01-01").getMonth()+1;//当前月数'
        var dayNum =31;
        for( x in aqiSourceData[pageState.nowSelectCity]){
            num +=aqiSourceData[pageState.nowSelectCity][x];
            j++;
            if( j == dayNum){
                chartData[((new Date(x).getFullYear()+"-"+(xNow)+"月"))] = Math.floor(num /j);
                num=0;
                j=0
            }
            xNow = new Date(x).getMonth()+1;
            dayNum =   new Date(new Date(new Date(x).setMonth(xNow)).setDate(0)).getDate();
        }
    }

}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
}
window.onload=function(){
    //console.log(randomBuildData(500));
    init();
}


function getByid(id){
   return document.getElementById(id);
}